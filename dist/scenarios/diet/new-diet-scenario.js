"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scenario_1 = require("../scenario");
var keyboard_maker_1 = require("../../utils/keyboard-maker");
var localization_1 = require("../../localization/localization");
var welcome_scenario_1 = require("../welcome/welcome-scenario");
var NewDietScenario = /** @class */ (function (_super) {
    __extends(NewDietScenario, _super);
    function NewDietScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NEW_STATE = 'NEW_DIET_NEW_STATE';
        return _this;
    }
    NewDietScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang, userId = params.userId;
            _this._bot.sendMessage(chatId, 'New Diet');
            _this.switchToAnotherScenario(userId, welcome_scenario_1.WelcomeScenario, params);
            return scenario_1.ActionResults.ReadyForDestroy;
        });
    };
    NewDietScenario.prototype.getInitKeyboard = function (lang, userId) {
        var keyboard = new keyboard_maker_1.KeyboardMaker();
        return keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonNewDiet), 'this.NEW_CALLBACK')
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonBack), 'this.BACK_CALLBACK')
            .result;
    };
    NewDietScenario.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return NewDietScenario;
}(scenario_1.Scenario));
exports.NewDietScenario = NewDietScenario;
