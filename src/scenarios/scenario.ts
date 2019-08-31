import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {ScenarioManager} from "./scenario-manager";
import {Params} from "../utils/parser";
import {isSomething, log} from "../utils/utils";
import {DietScenario} from "./diet/diet-scenario";

export interface ScenarioClass {new (bot: Bot, userManager: UserManager, scenarioManager: ScenarioManager): Scenario}

type RequestedData = {[key: string]: any} | any[];

export interface ScenarioRequestData {
    callback: string,
    data?: RequestedData
}

export enum ActionResults {
    ReadyForDestroy = 'readyForDestroy',
    Repeat = 'repeat'
}

export interface ScenarioAction {
    (params: Params): ActionResults | void
}

export abstract class Scenario {
    protected readonly INIT_STATE = 'BASE_INIT_STATE';
    protected readonly WAIT_STATE = 'BASE_WAIT_STATE';

    private readonly FINAL_STATE = 'BASE_FINAL_STATE';

    protected _state: string = this.INIT_STATE;
    protected _actions: {[key: string]: ScenarioAction} = {};

    private _waitProperties: {
        prevState?: string,
        expectedCallback?: string,
        requestData?: ScenarioRequestData
    } = {};

    constructor(
        protected _bot: Bot,
        protected _userManager: UserManager,
        protected _scenarioManager: ScenarioManager) {
    }

    public abstract init(): void;

    public activate(params: Params): { readyForDestroy: boolean, resultCallback?: string } {
        let readyForDestroy: boolean = false;
        let repeat: boolean = false;

        const action = this._actions[this._state];

        if (action) {
            log('Action', this._state, '+', params.callback ? 'CB: ' + params.callback : params.text ? 'TXT: ' + params.text : '_');

            const result = action(params);
            if (result) log('Has result', result);

            if (isSomething(result)) {
                if (result === ActionResults.ReadyForDestroy) {
                    readyForDestroy = true;
                } else {
                    repeat = true;
                }
            }
        }
        else {
            readyForDestroy = false;
        }

        if (!readyForDestroy && repeat) {
            log('Repeat action');
            return this.activate(params);
        }

        return {    readyForDestroy,
            resultCallback: readyForDestroy && this._waitProperties.requestData ? this._waitProperties.requestData.callback : undefined
        };
    }

    public setRequestData(requestData: ScenarioRequestData): void {
        this._waitProperties.requestData = requestData;
    }

    protected get requestedData(): RequestedData | undefined {
        return this._waitProperties.requestData? this._waitProperties.requestData.data : undefined;
    }

    protected setState(state: string): void {
        log('Set state', state);
        this._state = state;
    }

    protected addAction(state: string, action: ScenarioAction): void {
        this._actions[state] = action;
    }

    protected waitForScenario(params: Params, scenarioClass: ScenarioClass, requestData: ScenarioRequestData): void {
        log('Wait For Scenario', scenarioClass.name, requestData);
        this._waitProperties.prevState = this._state;
        this._waitProperties.expectedCallback = requestData.callback;

        this.setState(this.WAIT_STATE);

        if (!this._actions[this.WAIT_STATE]) {
            this.addAction(this.WAIT_STATE,
        params => {
                    if (params.callback && params.callback === this._waitProperties.expectedCallback) {
                        log('Callback received');
                        this.setState(this._waitProperties.prevState!);
                        return ActionResults.Repeat;
                    }
                    log('Waiting');
                }
            )
        }

        this._scenarioManager.add(params.userId, scenarioClass, params, requestData);
    }

    protected switchToAnotherScenario(userId: number, scenarioClass: ScenarioClass, forceParams: Params): void {
        log('switchToAnotherScenario', scenarioClass.name);
        this.setState(this.FINAL_STATE);

        this._scenarioManager.add(userId, scenarioClass, forceParams);
    }

    destroy(): void {
        delete this._bot;
        delete this._userManager;
        delete this._scenarioManager;

        delete this._actions;
        delete this._waitProperties;
    }
}