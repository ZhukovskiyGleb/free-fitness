"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("./bot/bot");
var user_manager_1 = require("./user/user-manager");
var scenario_manager_1 = require("./scenarios/scenario-manager");
var parser_1 = require("./utils/parser");
var welcome_scenario_1 = require("./scenarios/welcome/welcome-scenario");
var App = /** @class */ (function () {
    function App() {
        this._bot = new bot_1.Bot();
        this._bot.init(this.onMessageHandler.bind(this), this.onCallbackHandler.bind(this));
        this._userManager = new user_manager_1.UserManager();
        this._scenarioManager = new scenario_manager_1.ScenarioManager(this._bot, this._userManager);
    }
    App.prototype.onMessageHandler = function (msg) {
        var params = parser_1.Parser.parseMessage(msg);
        if (params) {
            var userId = params.userId;
            var activated = this._scenarioManager.activate(params);
            if (!activated) {
                this._scenarioManager.clearAll(userId);
                this._scenarioManager.add(userId, welcome_scenario_1.WelcomeScenario, params);
            }
        }
    };
    App.prototype.onCallbackHandler = function (query) {
        var params = parser_1.Parser.parseQuery(query);
        if (params) {
            this._scenarioManager.activate(params);
        }
    };
    return App;
}());
exports.App = App;
var app = new App();
