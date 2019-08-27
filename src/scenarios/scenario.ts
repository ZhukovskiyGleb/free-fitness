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
    protected readonly INIT_STATE = 'INIT_STATE';
    protected readonly FINISH_STATE = 'COMPLETE_STATE';

    protected _state: string = this.INIT_STATE;
    protected _actions: {[key: string]: ScenarioAction} = {};

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

    activate(params: Params): {readyForDestroy: boolean} {
        let readyForDestroy = true;

        const action = this._actions[this._state];

        if (action) {
            readyForDestroy = action(params);
        }
        else {
            readyForDestroy = false;
        }

        return {readyForDestroy};
    }

    destroy(): void {
        delete this._bot;
        delete this._userManager;
        delete this._scenarioManager;

        delete this._actions;
    }
}