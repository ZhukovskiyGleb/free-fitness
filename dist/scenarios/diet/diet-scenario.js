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
var user_1 = require("../../user/user");
var localization_1 = require("../../localization/localization");
var welcome_scenario_1 = require("../welcome/welcome-scenario");
var profile_scenario_1 = require("../profile/profile-scenario");
var utils_1 = require("../../utils/utils");
var new_diet_scenario_1 = require("./new-diet-scenario");
var DietScenario = /** @class */ (function (_super) {
    __extends(DietScenario, _super);
    function DietScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NEW_STATE = 'DIET_NEW_STATE';
        _this.PROFILE_READY_CALLBACK = 'DIET_PROFILE_READY_CALLBACK';
        _this.LOAD_CALLBACK = 'DIET_LOAD_CALLBACK';
        _this.NEW_CALLBACK = 'DIET_NEW_CALLBACK';
        _this.BACK_CALLBACK = 'DIET_BACK_CALLBACK';
        return _this;
    }
    DietScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang, userId = params.userId;
            switch (callback) {
                case _this.LOAD_CALLBACK:
                    break;
                case _this.NEW_CALLBACK:
                    _this.setState(_this.NEW_STATE);
                    return scenario_1.ActionResults.Repeat;
                case _this.BACK_CALLBACK:
                    _this.switchToAnotherScenario(userId, welcome_scenario_1.WelcomeScenario, params);
                    return scenario_1.ActionResults.ReadyForDestroy;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.WhatExactly), _this.getInitKeyboard(lang, userId));
                    break;
            }
        });
        this.addAction(this.NEW_STATE, function (params) {
            var callback = params.callback, userId = params.userId;
            if (callback === _this.PROFILE_READY_CALLBACK) {
                _this.switchToAnotherScenario(userId, new_diet_scenario_1.NewDietScenario, params);
                return scenario_1.ActionResults.ReadyForDestroy;
            }
            else {
                _this.waitForScenario(params, profile_scenario_1.ProfileScenario, {
                    callback: _this.PROFILE_READY_CALLBACK,
                    data: [user_1.UserProperty.Height, user_1.UserProperty.Weight, user_1.UserProperty.BodyType,
                        user_1.UserProperty.Activity, user_1.UserProperty.Age, user_1.UserProperty.Gender]
                });
            }
        });
    };
    DietScenario.prototype.getInitKeyboard = function (lang, userId) {
        var keyboard = new keyboard_maker_1.KeyboardMaker();
        var user = this._userManager.getUser(userId);
        if (user && utils_1.isSomething(user.getProperty(user_1.UserProperty.SavedDiet))) {
            keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonMyDiet), this.LOAD_CALLBACK);
        }
        return keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonNewDiet), this.NEW_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonBack), this.BACK_CALLBACK)
            .result;
    };
    DietScenario.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return DietScenario;
}(scenario_1.Scenario));
exports.DietScenario = DietScenario;
