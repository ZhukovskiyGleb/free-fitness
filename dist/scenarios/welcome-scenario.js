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
var scenario_1 = require("./scenario");
var localization_1 = require("../localization/localization");
var keyboard_maker_1 = require("../utils/keyboard-maker");
var WelcomeScenario = /** @class */ (function (_super) {
    __extends(WelcomeScenario, _super);
    function WelcomeScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SELECT_STATE = 'TEST_CALLBACK';
        _this.DIET_CALLBACK = 'DIET_CALLBACK';
        _this.WORKOUT_CALLBACK = 'WORKOUT_CALLBACK';
        return _this;
    }
    WelcomeScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var datetime = params.datetime, chatId = params.chatId, lang = params.lang, userId = params.userId, name = params.name;
            var user = _this._userManager.getUser(userId);
            var isNewUser = !user;
            if (isNewUser) {
                user = _this._userManager.createUser(userId, new Date().getTime());
            }
            if (user) {
                _this._bot.sendMessage(chatId, _this.getWelcomeText(lang, datetime, name, isNewUser), _this.getSelectKeyboard(lang));
                _this.setState(_this.SELECT_STATE);
            }
            else {
                return true;
            }
            return false;
        });
        this.addAction(this.SELECT_STATE, function (params) {
            var callback = params.callback;
            switch (callback) {
                case _this.DIET_CALLBACK:
                    break;
                case _this.WORKOUT_CALLBACK:
                    break;
            }
            return false;
        });
    };
    WelcomeScenario.prototype.getWelcomeText = function (lang, datetime, name, isNewUser) {
        if (isNewUser === void 0) { isNewUser = false; }
        var locId;
        if (isNewUser) {
            locId = localization_1.LOC_ID.NewbieMessage;
        }
        else {
            var curTime = new Date(datetime).getHours();
            locId = [localization_1.LOC_ID.Welcome, localization_1.LOC_ID.Hello, localization_1.LOC_ID.NiceToMeetYouAgain,
                curTime >= 19 ? localization_1.LOC_ID.GoodEvening :
                    curTime >= 10 ? localization_1.LOC_ID.GoodAfternoon :
                        localization_1.LOC_ID.GoodMorning][Math.floor(Math.random() * 4)];
        }
        return localization_1.Localization.loc(lang, locId, { name: name }) + '\n' + localization_1.Localization.loc(lang, localization_1.LOC_ID.HowCanIHelp);
    };
    WelcomeScenario.prototype.getSelectKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LOC_ID.ButtonDiet), this.DIET_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LOC_ID.ButtonWorkout), this.WORKOUT_CALLBACK)
            .result;
    };
    WelcomeScenario.prototype.destroy = function () {
    };
    return WelcomeScenario;
}(scenario_1.Scenario));
exports.WelcomeScenario = WelcomeScenario;
