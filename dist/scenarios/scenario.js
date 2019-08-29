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
    Scenario.prototype.activate = function (params) {
        console.log('Caller', this.activate.caller);
        var readyForDestroy = false;
        var repeat = false;
        var action = this._actions[this._state];
        if (action) {
            do {
                var result = action(params);
                if (result) {
                    if (typeof result === "boolean") {
                        readyForDestroy = result;
                    }
                    else {
                        readyForDestroy = result.readyForDestroy ? result.readyForDestroy : readyForDestroy;
                        repeat = result.repeat ? result.repeat : repeat;
                    }
                }
            } while (!readyForDestroy && repeat);
        }
        else {
            readyForDestroy = false;
        }
        return { readyForDestroy: readyForDestroy,
            resultCallback: this._waitProperties.requestData ? this._waitProperties.requestData.callback : undefined
        };
    };
    Scenario.prototype.setRequestData = function (requestData) {
        this._waitProperties.requestData = requestData;
    };
    Scenario.prototype.setState = function (state) {
        this._state = state;
    };
    Scenario.prototype.addAction = function (state, action) {
        this._actions[state] = action;
    };
    Scenario.prototype.waitForScenario = function (params, scenario, requestData) {
        var _this = this;
        this._waitProperties.prevState = this._state;
        this._waitProperties.expectedCallback = requestData.callback;
        this.setState(this.WAIT_STATE);
        if (!this._actions[this.WAIT_STATE]) {
            this.addAction(this.WAIT_STATE, function (params) {
                if (params.callback && params.callback === _this._waitProperties.expectedCallback) {
                    _this.setState(_this._waitProperties.prevState);
                    _this.activate(params);
                }
            });
        }
        this._scenarioManager.add(params.userId, scenario, params, requestData);
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
