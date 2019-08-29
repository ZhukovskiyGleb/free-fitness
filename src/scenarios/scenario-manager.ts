import {ScenarioRequestData, Scenario, ScenarioClass} from "./scenario";
import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {Params} from "../utils/parser";
import {isSomething} from "../utils/utils";

export class ScenarioManager {
    private readonly _scenarios: {[key: number]: Scenario[]} = {};

    constructor(private bot: Bot,
                private userManager: UserManager) {

    }

    public add(userId: number, scenarioClass: ScenarioClass, forceParams?: Params, requestData?: ScenarioRequestData): void {
        console.log('add scenario', scenarioClass.name);
        if (!this._scenarios[userId]) {
            this._scenarios[userId] = [];
        }

        const scenario = new scenarioClass(this.bot, this.userManager, this);
        scenario.init();
        this._scenarios[userId].push(scenario);

        if (requestData) {
            scenario.setRequestData(requestData);
        }

        if (forceParams) {
            this.activate(forceParams, scenario);
        }
    }

    public activate(params: Params, targetScenario?: Scenario): boolean {
        const scenarioList: Scenario[] = this._scenarios[params.userId];

        const callbackList: string[] = [];
        console.log('------- START ---------');
        if (!scenarioList || scenarioList.length === 0) console.log('Empty scenarios');

        if (scenarioList || targetScenario) {
            let index = -1;
            if (targetScenario) {
                index = scenarioList.indexOf(targetScenario);
            }
            if (index >= 0) {
                console.log('force scenario');
                this.activateScenario(scenarioList, index, params, callbackList);
            }
            else {
                console.log('scenarios amount', scenarioList.length);
                for (let i: number = scenarioList.length - 1; i >= 0; i--) {
                    this.activateScenario(scenarioList, i, params, callbackList);
                }
            }

            if (callbackList.length > 0) {
                callbackList.forEach(callback => {
                    params.callback = callback;
                    this.activate(params);
                });
            }
            console.log('-----------------');
            return true;
        }

        return false;
    }

    public clearAll(userId: number): void {
        if (!this._scenarios[userId]) {
            return;
        }

        this._scenarios[userId].forEach(scenario => {
            scenario.destroy();
        });

        delete this._scenarios[userId];
    }

    private activateScenario(scenarioList: Scenario[], index: number, params: Params, callbackList: string[]): void {
        const scenario = scenarioList[index];
        console.log('activateScenario', scenario.constructor.name);
        const { readyForDestroy, resultCallback } = scenario.activate(params);

        if (readyForDestroy) {
            console.log('remove', scenario.constructor.name);
            scenario.destroy();
            scenarioList.splice(index, 1);
        }

        if (isSomething(resultCallback)) {
            callbackList.push(resultCallback);
        }
    }

}