"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scenario = /** @class */ (function () {
    function Scenario(_bot, _userManager, _scenarioManager) {
        this._bot = _bot;
        this._userManager = _userManager;
        this._scenarioManager = _scenarioManager;
        this.INIT_STATE = 'BASE_INIT_STATE';
        this.WAIT_STATE = 'BASE_WAIT_STATE';
        this._state = this.INIT_STATE;
        this._actions = {};
        this._waitProperties = {};
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
        return { readyForDestroy: readyForDestroy,
            resultCallback: this._waitProperties.responseCallback
        };
    };
    Scenario.prototype.waitForResult = function (params, scenario, requestedCallback) {
        var _this = this;
        this._waitProperties.prevState = this._state;
        this._waitProperties.requestedCallback = requestedCallback;
        this.setState(this.WAIT_STATE);
        if (!this._actions[this.WAIT_STATE]) {
            this.addAction(this.WAIT_STATE, function (params) {
                if (params.callback && params.callback === _this._waitProperties.requestedCallback) {
                    _this.setState(_this._waitProperties.prevState);
                    _this.activate(params);
                }
                return true;
            });
        }
        this._scenarioManager.add(params.userId, scenario, params, requestedCallback);
    };
    Scenario.prototype.setResultCallback = function (callback) {
        this._waitProperties.responseCallback = callback;
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
