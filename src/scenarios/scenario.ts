import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {ScenarioManager} from "./scenario-manager";
import {Params} from "../utils/parser";

export interface ScenarioClass {new (bot: Bot, userManager: UserManager, scenarioManager: ScenarioManager): Scenario}

export interface ScenarioRequestData {
    callback: string,
    [key: string]: any
}

export interface ScenarioAction {
    (params: Params): { readyForDestroy?: boolean, repeat?: boolean } | boolean | void
}

export abstract class Scenario {
    protected readonly INIT_STATE = 'BASE_INIT_STATE';
    protected readonly WAIT_STATE = 'BASE_WAIT_STATE';

    protected _state: string = this.INIT_STATE;
    protected _actions: {[key: string]: ScenarioAction} = {};

    private readonly _waitProperties: {
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
        console.log('Caller', this.activate.caller);

        let readyForDestroy: boolean = false;
        let repeat: boolean = false;

        const action = this._actions[this._state];

        if (action) {
            do {
                const result = action(params);

                if (result) {
                    if (typeof result === "boolean") {
                        readyForDestroy = result;
                    } else {
                        readyForDestroy = result.readyForDestroy ? result.readyForDestroy : readyForDestroy;
                        repeat = result.repeat ? result.repeat : repeat;
                    }
                }
            } while (!readyForDestroy && repeat);
        }
        else {
            readyForDestroy = false;
        }

        return {    readyForDestroy,
            resultCallback: this._waitProperties.requestData ? this._waitProperties.requestData.callback : undefined
        };
    }

    public setRequestData(requestData: ScenarioRequestData): void {
        this._waitProperties.requestData = requestData;
    }

    protected setState(state: string): void {
        this._state = state;
    }

    protected addAction(state: string, action: ScenarioAction): void {
        this._actions[state] = action;
    }

    protected waitForScenario(params: Params, scenario: ScenarioClass, requestData: ScenarioRequestData): void {
        this._waitProperties.prevState = this._state;
        this._waitProperties.expectedCallback = requestData.callback;

        this.setState(this.WAIT_STATE);

        if (!this._actions[this.WAIT_STATE]) {
            this.addAction(this.WAIT_STATE,
        params => {
                    if (params.callback && params.callback === this._waitProperties.expectedCallback) {
                        this.setState(this._waitProperties.prevState!);
                        this.activate(params);
                    }
                }
            )
        }

        this._scenarioManager.add(params.userId, scenario, params, requestData);
    }

    destroy(): void {
        delete this._bot;
        delete this._userManager;
        delete this._scenarioManager;

        delete this._actions;
    }
}