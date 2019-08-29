import {Bot} from "./bot/bot";
import {CallbackQuery, Message} from "node-telegram-bot-api";
import {UserManager} from "./user/user-manager";
import {ScenarioManager} from "./scenarios/scenario-manager";
import {Parser} from "./utils/parser";
import {WelcomeScenario} from "./scenarios/welcome-scenario";
import {ProfileUtils} from "./utils/profile-utils";

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