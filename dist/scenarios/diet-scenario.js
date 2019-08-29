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
var localization_1 = require("../localization/localization");
var DietScenario = /** @class */ (function (_super) {
    __extends(DietScenario, _super);
    function DietScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NEW_STATE = 'DIET_NEW_STATE';
        _this.WAIT_PROFILE_CALLBACK = 'WAIT_PROFILE_CALLBACK';
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
                    return { repeat: true };
                    break;
                case _this.BACK_CALLBACK:
                    break;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.WhatExactly), _this.getInitKeyboard(lang, userId));
                    break;
            }
        });
        this.addAction(this.NEW_STATE, function (params) {
            var userId = params.userId;
            var user = _this._userManager.getUser(userId);
            if (user) {
                if (user.hasProperties([user_1.UserProperty.Height, user_1.UserProperty.Weight, user_1.UserProperty.BodyType, user_1.UserProperty.Activity])) {
                    var _a = user.properties, height = _a.height, weight = _a.weight, bodyType = _a.bodyType, activity = _a.activity;
                }
                else {
                    // this.waitForScenario(params, )
                }
            }
            else {
                return true;
            }
            return false;
        });
    };
    DietScenario.prototype.getInitKeyboard = function (lang, userId) {
        var keyboard = new keyboard_maker_1.KeyboardMaker();
        var user = this._userManager.getUser(userId);
        if (user && !!user.getProperty(user_1.UserProperty.SavedDiet)) {
            keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonDiet), this.LOAD_CALLBACK);
        }
        return keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonDiet), this.NEW_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonWorkout), this.BACK_CALLBACK)
            .result;
    };
    DietScenario.prototype.destroy = function () {
    };
    return DietScenario;
}(scenario_1.Scenario));
exports.DietScenario = DietScenario;
