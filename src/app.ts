import {Bot} from "./bot/bot";
import {CallbackQuery, Message} from "node-telegram-bot-api";
import {UserManager} from "./user/user-manager";
import {ScenarioManager} from "./scenarios/scenario-manager";
import {Parser} from "./utils/parser";
import {WelcomeScenario} from "./scenarios/welcome/welcome-scenario";
import {Diet} from "./content/diet";
import {DietMealsAmount, DietTarget, Formation} from "./content/diet-utils";
import {Activity, BodyType, Gender, UserProperty} from "./user/user";
import {FoodType} from "./content/food";

export class App {
    private readonly _bot: Bot;
    private readonly _userManager: UserManager;
    private readonly _scenarioManager: ScenarioManager;

    constructor() {
        this._bot = new Bot();
        this._bot.init(
            this.onMessageHandler.bind(this),
            this.onCallbackHandler.bind(this)
        );

        this._userManager = new UserManager();

        this._scenarioManager = new ScenarioManager(this._bot, this._userManager);

        const id = 123123;
        this._userManager.createUser(id, new Date().getTime());
        const user = this._userManager.getUser(id);

        if (user) {
            user.setProperty(UserProperty.Activity, Activity.Average);
            user.setProperty(UserProperty.BodyType, BodyType.Muscular);
            user.setProperty(UserProperty.Weight, 95);
            user.setProperty(UserProperty.Height, 183);
            user.setProperty(UserProperty.Gender, Gender.Male);
            user.setProperty(UserProperty.Age, 31);

            const diet = new Diet();
            diet.setTarget(DietTarget.Loss);
            diet.setMealsAmount(DietMealsAmount.Three);
            diet.setExcludes([]);
            diet.setFormation(Formation.Variety);

            // log('Diet result:', );
            diet.getDiet(user, 'ru');
        }
    }

    private onMessageHandler(msg: Message) {
        const params = Parser.parseMessage(msg);

        if (params) {
            const { userId } = params;

            const activated = this._scenarioManager.activate(params);

            if (!activated) {
                this._scenarioManager.clearAll(userId);
                this._scenarioManager.add(userId, WelcomeScenario, params);
            }
        }
    }

    private onCallbackHandler(query: CallbackQuery) {
        const params = Parser.parseQuery(query);

        if (params) {
            this._scenarioManager.activate(params);
        }
    }
}

const app = new App();