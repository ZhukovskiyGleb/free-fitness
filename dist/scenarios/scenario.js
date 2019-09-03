"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var ActionResults;
(function (ActionResults) {
    ActionResults["ReadyForDestroy"] = "readyForDestroy";
    ActionResults["Repeat"] = "repeat";
})(ActionResults = exports.ActionResults || (exports.ActionResults = {}));
var Scenario = /** @class */ (function () {
    function Scenario(_bot, _userManager, _scenarioManager) {
        this._bot = _bot;
        this._userManager = _userManager;
        this._scenarioManager = _scenarioManager;
        this.INIT_STATE = 'BASE_INIT_STATE';
        this.WAIT_STATE = 'BASE_WAIT_STATE';
        this.FINAL_STATE = 'BASE_FINAL_STATE';
        this._state = this.INIT_STATE;
        this._actions = {};
        this._waitProperties = {};
    }
    Scenario.prototype.activate = function (params) {
        var readyForDestroy = false;
        var repeat = false;
        var action = this._actions[this._state];
        if (action) {
            utils_1.logScenario('Action', this._state, '+', params.callback ? 'CB: ' + params.callback : params.text ? 'TXT: ' + params.text : '_');
            var result = action(params);
            if (result)
                utils_1.logScenario('Has result', result);
            if (utils_1.isSomething(result)) {
                if (result === ActionResults.ReadyForDestroy) {
                    readyForDestroy = true;
                }
                else {
                    repeat = true;
                }
            }
        }
        else {
            readyForDestroy = false;
        }
        if (!readyForDestroy && repeat) {
            utils_1.logScenario('Repeat action');
            return this.activate(params);
        }
        return { readyForDestroy: readyForDestroy,
            resultCallback: readyForDestroy && this._waitProperties.requestData ? this._waitProperties.requestData.callback : undefined
        };
    };
    Scenario.prototype.setRequestData = function (requestData) {
        this._waitProperties.requestData = requestData;
    };
    Object.defineProperty(Scenario.prototype, "requestedData", {
        get: function () {
            return this._waitProperties.requestData ? this._waitProperties.requestData.data : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Scenario.prototype.setState = function (state) {
        utils_1.logScenario('Set state', state);
        this._state = state;
    };
    Scenario.prototype.addAction = function (state, action) {
        this._actions[state] = action;
    };
    Scenario.prototype.waitForScenario = function (params, scenarioClass, requestData) {
        var _this = this;
        utils_1.logScenario('Wait For Scenario', scenarioClass.name, requestData);
        this._waitProperties.prevState = this._state;
        this._waitProperties.expectedCallback = requestData.callback;
        this.setState(this.WAIT_STATE);
        if (!this._actions[this.WAIT_STATE]) {
            this.addAction(this.WAIT_STATE, function (params) {
                if (params.callback && params.callback === _this._waitProperties.expectedCallback) {
                    utils_1.logScenario('Callback received');
                    _this.setState(_this._waitProperties.prevState);
                    return ActionResults.Repeat;
                }
                utils_1.logScenario('Waiting');
            });
        }
        this._scenarioManager.add(params.userId, scenarioClass, params, requestData);
    };
    Scenario.prototype.switchToAnotherScenario = function (userId, scenarioClass, forceParams) {
        utils_1.logScenario('switchToAnotherScenario', scenarioClass.name);
        this.setState(this.FINAL_STATE);
        this._scenarioManager.add(userId, scenarioClass, forceParams);
    };
    Scenario.prototype.destroy = function () {
        delete this._bot;
        delete this._userManager;
        delete this._scenarioManager;
        delete this._actions;
        delete this._waitProperties;
    };
    return Scenario;
}());
exports.Scenario = Scenario;
