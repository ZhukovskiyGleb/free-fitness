import {ScenarioRequestData, Scenario, ScenarioClass} from "./scenario";
import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {Params} from "../utils/parser";

export class ScenarioManager {
    private readonly scenarios: {[key: number]: Scenario[]} = {};

    constructor(private bot: Bot,
                private userManager: UserManager) {

    }

    public add(userId: number, scenarioClass: ScenarioClass, forceParams?: Params, requestData?: ScenarioRequestData): void {
        if (!this.scenarios[userId]) {
            this.scenarios[userId] = [];
        }

        const scenario = new scenarioClass(this.bot, this.userManager, this);
        scenario.init();
        this.scenarios[userId].push(scenario);

        if (requestData) {
            scenario.setRequestData(requestData);
        }

        if (forceParams) {
            scenario.activate(forceParams);
        }
    }

    public activate(params: Params): boolean {
        const scenarios: Scenario[] = this.scenarios[params.userId];

        const callbacks = [];

        if (scenarios) {
            for (let i: number = scenarios.length - 1; i >= 0; i--) {
                const { readyForDestroy, resultCallback } = scenarios[i].activate(params);

                if (readyForDestroy) {
                    scenarios[i].destroy();
                    scenarios.splice(i);
                }

                if (resultCallback) {
                    callbacks.push(resultCallback);
                }

            }

            if (callbacks.length > 0) {
                callbacks.forEach(callback => {
                    params.callback = callback;
                    this.activate(params);
                });
            }

            return true;
        }

        return false;
    }

    public clearAll(userId: number): void {
        if (!this.scenarios[userId]) {
            return;
        }

        this.scenarios[userId].forEach(scenario => {
            scenario.destroy();
        });

        delete this.scenarios[userId];
    }

}