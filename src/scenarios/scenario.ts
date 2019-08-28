import {Bot} from "../bot/bot";
import {UserManager} from "../user/user-manager";
import {ScenarioManager} from "./scenario-manager";
import {Params} from "../utils/parser";

export interface KeyboardMarkup {reply_markup: {inline_keyboard: any[]}}

export interface ScenarioClass {new (bot: Bot, userManager: UserManager, scenarioManager: ScenarioManager): Scenario}

export interface ScenarioAction {
    (params: Params): boolean
}

export abstract class Scenario {
    protected readonly INIT_STATE = 'BASE_INIT_STATE';
    protected readonly WAIT_STATE = 'BASE_WAIT_STATE';

    protected _state: string = this.INIT_STATE;
    protected _actions: {[key: string]: ScenarioAction} = {};

    private readonly _waitProperties: {
        prevState?: string,
        requestedCallback?: string,
        responseCallback?: string
    } = {};

    constructor(
        protected _bot: Bot,
        protected _userManager: UserManager,
        protected _scenarioManager: ScenarioManager) {
    }

    public abstract init(): void;

    protected setState(state: string): void {
        this._state = state;
    }

    protected addAction(state: string, action: ScenarioAction): void {
        this._actions[state] = action;
    }

    activate(params: Params): {readyForDestroy: boolean, resultCallback?: string} {
        let readyForDestroy = true;

        const action = this._actions[this._state];

        if (action) {
            readyForDestroy = action(params);
        }
        else {
            readyForDestroy = false;
        }

        return {    readyForDestroy,
                    resultCallback: this._waitProperties.responseCallback
                };
    }

    private waitForScenario(params: Params, scenario: ScenarioClass, requestedCallback: string): void {
        this._waitProperties.prevState = this._state;
        this._waitProperties.requestedCallback = requestedCallback;

        this.setState(this.WAIT_STATE);

        if (!this._actions[this.WAIT_STATE]) {
            this.addAction(this.WAIT_STATE,
        params => {
                    if (params.callback && params.callback === this._waitProperties.requestedCallback) {
                        this.setState(this._waitProperties.prevState!);
                        this.activate(params);
                    }

                    return true;
                }
            )
        }

        this._scenarioManager.add(params.userId, scenario, params, requestedCallback);
    }

    public setResultCallback(callback: string): void {
        this._waitProperties.responseCallback = callback;
    }

    destroy(): void {
        delete this._bot;
        delete this._userManager;
        delete this._scenarioManager;

        delete this._actions;
    }
}