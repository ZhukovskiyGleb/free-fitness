import {ScenarioRequestData, Scenario, ScenarioClass} from "./scenario";
import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {Params} from "../utils/parser";
import {isSomething, logScenario} from "../utils/utils";

export class ScenarioManager {
    private readonly _scenarios: {[key: number]: Scenario[]} = {};

    constructor(private bot: Bot,
                private userManager: UserManager) {

    }

    public add(userId: number, scenarioClass: ScenarioClass, forceParams?: Params, requestData?: ScenarioRequestData): void {
        logScenario('add scenario', scenarioClass.name);
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

        let callback: string | undefined;
        if (!scenarioList || scenarioList.length === 0) logScenario('Empty scenarios');

        if (scenarioList || targetScenario) {
            let index = -1;
            if (targetScenario) {
                index = scenarioList.indexOf(targetScenario);
            }
            if (index >= 0) {
                logScenario('------- FORCE START ---------');
                callback = this.activateScenario(scenarioList, index, params);
            }
            else {
                logScenario('------- START LIST ' + scenarioList.length + ' ---------');
                for (let i: number = scenarioList.length - 1; i >= 0; i--) {
                    callback = this.activateScenario(scenarioList, i, params);
                    if (isSomething(callback)) {
                        break;
                    }
                }
            }

            if (isSomething(callback)) {
                logScenario('Activate callback', callback);
                params.callback = callback;
                this.activate(params);
            }
            logScenario('------- FINISH ---------');
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

    private activateScenario(scenarioList: Scenario[], index: number, params: Params): string | undefined {
        const scenario = scenarioList[index];
        logScenario('activate Scenario', scenario.constructor.name);
        const { readyForDestroy, resultCallback } = scenario.activate(params);

        if (readyForDestroy) {
            logScenario('remove', scenario.constructor.name);
            scenario.destroy();
            scenarioList.splice(index, 1);
        }

        return resultCallback;
    }

}