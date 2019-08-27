"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scenario = /** @class */ (function () {
    function Scenario(_bot, _userManager, _scenarioManager) {
        this._bot = _bot;
        this._userManager = _userManager;
        this._scenarioManager = _scenarioManager;
        this.INIT_STATE = 'INIT_STATE';
        this.FINISH_STATE = 'COMPLETE_STATE';
        this._state = this.INIT_STATE;
        this._actions = {};
    }
    Scenario.prototype.setState = function (state) {
        this._state = state;
    };
    Scenario.prototype.addAction = function (state, action) {
        this._actions[state] = action;
    };
    Scenario.prototype.activate = function (params) {
        var readyForDestroy = true;
        var action = this._actions[this._state];
        if (action) {
            readyForDestroy = action(params);
        }
        else {
            readyForDestroy = false;
        }
        return { readyForDestroy: readyForDestroy };
    };
    Scenario.prototype.destroy = function () {
        delete this._bot;
        delete this._userManager;
        delete this._scenarioManager;
        delete this._actions;
    };
    return Scenario;
}());
exports.Scenario = Scenario;
