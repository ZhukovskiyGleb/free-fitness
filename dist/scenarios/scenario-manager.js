"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScenarioManager = /** @class */ (function () {
    function ScenarioManager(bot, userManager) {
        this.bot = bot;
        this.userManager = userManager;
        this.scenarios = {};
    }
    ScenarioManager.prototype.add = function (userId, scenarioClass, forceParams) {
        if (!this.scenarios[userId]) {
            this.scenarios[userId] = [];
        }
        var scenario = new scenarioClass(this.bot, this.userManager, this);
        scenario.init();
        this.scenarios[userId].push(scenario);
        if (forceParams) {
            scenario.activate(forceParams);
        }
    };
    ScenarioManager.prototype.activate = function (params) {
        var scenarios = this.scenarios[params.userId];
        if (scenarios) {
            for (var i = scenarios.length - 1; i >= 0; i--) {
                var readyForDestroy = scenarios[i].activate(params).readyForDestroy;
                if (readyForDestroy) {
                    scenarios[i].destroy();
                    scenarios.splice(i);
                }
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
