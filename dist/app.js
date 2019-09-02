"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("./bot/bot");
var user_manager_1 = require("./user/user-manager");
var scenario_manager_1 = require("./scenarios/scenario-manager");
var parser_1 = require("./utils/parser");
var welcome_scenario_1 = require("./scenarios/welcome/welcome-scenario");
var diet_1 = require("./content/diet");
var diet_utils_1 = require("./content/diet-utils");
var user_1 = require("./user/user");
var App = /** @class */ (function () {
    function App() {
        this._bot = new bot_1.Bot();
        this._bot.init(this.onMessageHandler.bind(this), this.onCallbackHandler.bind(this));
        this._userManager = new user_manager_1.UserManager();
        this._scenarioManager = new scenario_manager_1.ScenarioManager(this._bot, this._userManager);
        var id = 123123;
        this._userManager.createUser(id, new Date().getTime());
        var user = this._userManager.getUser(id);
        if (user) {
            user.setProperty(user_1.UserProperty.Activity, user_1.Activity.Average);
            user.setProperty(user_1.UserProperty.BodyType, user_1.BodyType.Muscular);
            user.setProperty(user_1.UserProperty.Weight, 95);
            user.setProperty(user_1.UserProperty.Height, 183);
            user.setProperty(user_1.UserProperty.Gender, user_1.Gender.Male);
            user.setProperty(user_1.UserProperty.Age, 31);
            var diet = new diet_1.Diet();
            diet.setTarget(diet_utils_1.DietTarget.Loss);
            diet.setMealsAmount(diet_utils_1.DietMealsAmount.Three);
            diet.setExcludes([]);
            diet.setFormation(diet_utils_1.Formation.Variety);
            // log('Diet result:', );
            diet.getDiet(user, 'ru');
        }
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
