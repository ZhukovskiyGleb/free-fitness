"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var ScenarioManager = /** @class */ (function () {
    function ScenarioManager(bot, userManager) {
        this.bot = bot;
        this.userManager = userManager;
        this._scenarios = {};
    }
    ScenarioManager.prototype.add = function (userId, scenarioClass, forceParams, requestData) {
        console.log('add scenario', scenarioClass.name);
        if (!this._scenarios[userId]) {
            this._scenarios[userId] = [];
        }
        var scenario = new scenarioClass(this.bot, this.userManager, this);
        scenario.init();
        this._scenarios[userId].push(scenario);
        if (requestData) {
            scenario.setRequestData(requestData);
        }
        if (forceParams) {
            this.activate(forceParams, scenario);
        }
    };
    ScenarioManager.prototype.activate = function (params, targetScenario) {
        var _this = this;
        var scenarioList = this._scenarios[params.userId];
        var callbackList = [];
        console.log('------- START ---------');
        if (!scenarioList || scenarioList.length === 0)
            console.log('Empty scenarios');
        if (scenarioList || targetScenario) {
            var index = -1;
            if (targetScenario) {
                index = scenarioList.indexOf(targetScenario);
            }
            if (index >= 0) {
                console.log('force scenario');
                this.activateScenario(scenarioList, index, params, callbackList);
            }
            else {
                console.log('scenarios amount', scenarioList.length);
                for (var i = scenarioList.length - 1; i >= 0; i--) {
                    this.activateScenario(scenarioList, i, params, callbackList);
                }
            }
            if (callbackList.length > 0) {
                callbackList.forEach(function (callback) {
                    params.callback = callback;
                    _this.activate(params);
                });
            }
            console.log('-----------------');
            return true;
        }
        return false;
    };
    ScenarioManager.prototype.clearAll = function (userId) {
        if (!this._scenarios[userId]) {
            return;
        }
        this._scenarios[userId].forEach(function (scenario) {
            scenario.destroy();
        });
        delete this._scenarios[userId];
    };
    ScenarioManager.prototype.activateScenario = function (scenarioList, index, params, callbackList) {
        var scenario = scenarioList[index];
        console.log('activateScenario', scenario.constructor.name);
        var _a = scenario.activate(params), readyForDestroy = _a.readyForDestroy, resultCallback = _a.resultCallback;
        if (readyForDestroy) {
            console.log('remove', scenario.constructor.name);
            scenario.destroy();
            scenarioList.splice(index, 1);
        }
        if (utils_1.isSomething(resultCallback)) {
            callbackList.push(resultCallback);
        }
    };
    return ScenarioManager;
}());
exports.ScenarioManager = ScenarioManager;
