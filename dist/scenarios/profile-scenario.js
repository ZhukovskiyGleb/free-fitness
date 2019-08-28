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
var keyboard_maker_1 = require("../utils/keyboard-maker");
var user_1 = require("../user/user");
var DietScenario = /** @class */ (function (_super) {
    __extends(DietScenario, _super);
    function DietScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SELECT_STATE = 'TEST_CALLBACK';
        return _this;
    }
    DietScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var datetime = params.datetime, chatId = params.chatId, lang = params.lang, userId = params.userId, name = params.name;
            var user = _this._userManager.getUser(userId);
            if (user) {
                if (user.hasProperties([user_1.UserProperty.Height, user_1.UserProperty.Weight, user_1.UserProperty.BodyType, user_1.UserProperty.Activity])) {
                    var _a = user.properties, height = _a.height, weight = _a.weight, bodyType = _a.bodyType, activity = _a.activity;
                }
                else {
                }
            }
            else {
                return true;
            }
            return false;
        });
    };
    // private getWelcomeText(lang: string, datetime: number, name: string, isNewUser: boolean = false): string {
    //     let locId: LocId;
    //     if (isNewUser) {
    //         locId = LocId.NewbieMessage;
    //     }
    //     else {
    //         const curTime = new Date(datetime).getHours();
    //         locId = [LocId.Welcome, LocId.Hello, LocId.NiceToMeetYouAgain,
    //         curTime >= 19 ? LocId.GoodEvening :
    //         curTime >= 10 ? LocId.GoodAfternoon :
    //         LocId.GoodMorning][Math.floor(Math.random() * 4)];
    //     }
    //     return Localization.loc(lang, locId, {name}) + '\n' + Localization.loc(lang, LocId.HowCanIHelp);
    // }
    DietScenario.prototype.getSelectKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            // .addButton(Localization.loc(lang, LocId.ButtonDiet), this.DIET_CALLBACK)
            // .addButton(Localization.loc(lang, LocId.ButtonWorkout), this.WORKOUT_CALLBACK)
            .result;
    };
    DietScenario.prototype.destroy = function () {
    };
    return DietScenario;
}(scenario_1.Scenario));
exports.DietScenario = DietScenario;
