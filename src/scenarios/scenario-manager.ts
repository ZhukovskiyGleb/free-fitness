import {Scenario, ScenarioClass} from "./scenario";
import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {Params} from "../utils/parser";

export class ScenarioManager {
    private readonly scenarios: {[key: number]: Scenario[]} = {};

    constructor(private bot: Bot,
                private userManager: UserManager) {

    }

    add(userId: number, scenarioClass: ScenarioClass, forceParams?: Params): void {
        if (!this.scenarios[userId]) {
            this.scenarios[userId] = [];
        }

        const scenario = new scenarioClass(this.bot, this.userManager, this);
        scenario.init();
        this.scenarios[userId].push(scenario);

        if (forceParams) {
            scenario.activate(forceParams);
        }
    }

    activate(params: Params): boolean {
        const scenarios: Scenario[] = this.scenarios[params.userId];

        if (scenarios) {
            for (let i: number = scenarios.length - 1; i >= 0; i--) {
                const {readyForDestroy} = scenarios[i].activate(params);

                if (readyForDestroy) {
                    console.log('SCENARIO REMOVED', typeof scenarios[i]);
                    scenarios[i].destroy();
                    scenarios.splice(i);
                }
            }

            return true;
        }

        return false;
    }

}