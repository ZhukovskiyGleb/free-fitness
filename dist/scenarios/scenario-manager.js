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
        utils_1.log('add scenario', scenarioClass.name);
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
        var scenarioList = this._scenarios[params.userId];
        var callback;
        if (!scenarioList || scenarioList.length === 0)
            utils_1.log('Empty scenarios');
        if (scenarioList || targetScenario) {
            var index = -1;
            if (targetScenario) {
                index = scenarioList.indexOf(targetScenario);
            }
            if (index >= 0) {
                utils_1.log('------- FORCE START ---------');
                callback = this.activateScenario(scenarioList, index, params);
            }
            else {
                utils_1.log('------- START LIST ' + scenarioList.length + ' ---------');
                for (var i = scenarioList.length - 1; i >= 0; i--) {
                    callback = this.activateScenario(scenarioList, i, params);
                    if (utils_1.isSomething(callback)) {
                        break;
                    }
                }
            }
            if (utils_1.isSomething(callback)) {
                utils_1.log('Activate callback', callback);
                params.callback = callback;
                this.activate(params);
            }
            utils_1.log('------- FINISH ---------');
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
    ScenarioManager.prototype.activateScenario = function (scenarioList, index, params) {
        var scenario = scenarioList[index];
        utils_1.log('activate Scenario', scenario.constructor.name);
        var _a = scenario.activate(params), readyForDestroy = _a.readyForDestroy, resultCallback = _a.resultCallback;
        if (readyForDestroy) {
            utils_1.log('remove', scenario.constructor.name);
            scenario.destroy();
            scenarioList.splice(index, 1);
        }
        return resultCallback;
    };
    return ScenarioManager;
}());
exports.ScenarioManager = ScenarioManager;
