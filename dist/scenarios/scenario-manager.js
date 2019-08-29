"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScenarioManager = /** @class */ (function () {
    function ScenarioManager(bot, userManager) {
        this.bot = bot;
        this.userManager = userManager;
        this.scenarios = {};
    }
    ScenarioManager.prototype.add = function (userId, scenarioClass, forceParams, requestData) {
        if (!this.scenarios[userId]) {
            this.scenarios[userId] = [];
        }
        var scenario = new scenarioClass(this.bot, this.userManager, this);
        scenario.init();
        this.scenarios[userId].push(scenario);
        if (requestData) {
            scenario.setRequestData(requestData);
        }
        if (forceParams) {
            this.activate(forceParams);
        }
    };
    ScenarioManager.prototype.activate = function (params) {
        var _this = this;
        var scenarios = this.scenarios[params.userId];
        var callbacks = [];
        if (scenarios) {
            for (var i = scenarios.length - 1; i >= 0; i--) {
                var _a = scenarios[i].activate(params), readyForDestroy = _a.readyForDestroy, resultCallback = _a.resultCallback;
                if (readyForDestroy) {
                    scenarios[i].destroy();
                    scenarios.splice(i);
                }
                if (resultCallback) {
                    callbacks.push(resultCallback);
                }
            }
            if (callbacks.length > 0) {
                callbacks.forEach(function (callback) {
                    params.callback = callback;
                    _this.activate(params);
                });
            }
            return true;
        }
        return false;
    };
    ScenarioManager.prototype.clearAll = function (userId) {
        if (!this.scenarios[userId]) {
            return;
        }
        this.scenarios[userId].forEach(function (scenario) {
            scenario.destroy();
        });
        delete this.scenarios[userId];
    };
    return ScenarioManager;
}());
exports.ScenarioManager = ScenarioManager;
