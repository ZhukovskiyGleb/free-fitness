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
var diet_1 = require("../../content/diet");
var diet_scenario_utils_1 = require("./diet-scenario-utils");
var utils_1 = require("../../utils/utils");
var welcome_scenario_1 = require("../welcome/welcome-scenario");
var diet_scenario_1 = require("./diet-scenario");
var NewDietScenario = /** @class */ (function (_super) {
    __extends(NewDietScenario, _super);
    function NewDietScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TARGET_STATE = 'NEW_DIET_TARGET_STATE';
        _this.MEAL_AMOUNT_STATE = 'NEW_DIET_MEAL_AMOUNT_STATE';
        _this.EXCLUDING_STATE = 'NEW_DIET_EXCLUDING_STATE';
        _this.FORMATION_STATE = 'NEW_DIET_FORMATION_STATE';
        _this.RESULT_STATE = 'NEW_DIET_RESULT_STATE';
        return _this;
    }
    NewDietScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            _this._diet = new diet_1.Diet();
            _this.setState(_this.TARGET_STATE);
            return scenario_1.ActionResults.Repeat;
        });
        this.addAction(this.TARGET_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang;
            switch (callback) {
                case diet_scenario_utils_1.DietScenarioUtils.LOSS_CALLBACK:
                case diet_scenario_utils_1.DietScenarioUtils.SUPPORT_CALLBACK:
                case diet_scenario_utils_1.DietScenarioUtils.GAIN_CALLBACK:
                    if (_this._diet) {
                        _this._diet.setTarget(diet_scenario_utils_1.DietScenarioUtils.getTargetByCallback(callback));
                        _this.setState(_this.MEAL_AMOUNT_STATE);
                    }
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.DietTarget), _this.getTargetKeyboard(lang));
            }
        });
        this.addAction(this.MEAL_AMOUNT_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang;
            switch (callback) {
                case diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_3:
                case diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_4:
                case diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_5:
                case diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_6:
                    if (_this._diet) {
                        _this._diet.setMealsAmount(diet_scenario_utils_1.DietScenarioUtils.getMealsAmountByCallback(callback));
                        _this.setState(_this.EXCLUDING_STATE);
                    }
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.MealsAmount), _this.getMealsAmountKeyboard());
            }
        });
        this.addAction(this.EXCLUDING_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang;
            switch (callback) {
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_MEAT:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_POULTRY:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_FISH:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_SEAFOOD:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_EGGS:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_MILK:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_FRUITS:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_EXPENSIVE:
                case diet_scenario_utils_1.DietScenarioUtils.FOOD_SPORT_NUTRITION:
                    if (_this._excludeKeyboard) {
                        _this._excludeKeyboard.updateCheckbox(callback);
                        _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.ExcludeFood), _this._excludeKeyboard.result);
                    }
                    break;
                case diet_scenario_utils_1.DietScenarioUtils.CONTINUE:
                    if (_this._diet && _this._excludeKeyboard) {
                        _this._diet.setExcludes(diet_scenario_utils_1.DietScenarioUtils.getExcludesByCheckboxes(_this._excludeKeyboard.checkboxes));
                    }
                    _this.setState(_this.FORMATION_STATE);
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.ExcludeFood), _this.getExcludeKeyboard(lang));
            }
        });
        this.addAction(this.FORMATION_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang;
            switch (callback) {
                case diet_scenario_utils_1.DietScenarioUtils.FORMATION_VARIETY_CALLBACK:
                case diet_scenario_utils_1.DietScenarioUtils.FORMATION_MONOTONY_CALLBACK:
                    if (_this._diet) {
                        _this._diet.setFormation(diet_scenario_utils_1.DietScenarioUtils.getFormationByCallback(callback));
                        _this.setState(_this.RESULT_STATE);
                    }
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.DietFormation), _this.getFormationKeyboard(lang));
            }
        });
        this.addAction(this.RESULT_STATE, function (params) {
            var callback = params.callback, chatId = params.chatId, lang = params.lang, userId = params.userId;
            switch (callback) {
                case diet_scenario_utils_1.DietScenarioUtils.RESULT_SAVE_CALLBACK:
                case diet_scenario_utils_1.DietScenarioUtils.BACK_CALLBACK:
                    _this.switchToAnotherScenario(userId, diet_scenario_1.DietScenario, params);
                    return scenario_1.ActionResults.ReadyForDestroy;
                default:
                    var user = _this._userManager.getUser(userId);
                    if (user && _this._diet) {
                        var dietDescription = _this._diet.getDiet(user, lang);
                        if (dietDescription) {
                            _this._bot.sendMessage(chatId, dietDescription, _this.getResultKeyboard(lang));
                            return;
                        }
                    }
                    utils_1.log('Diet creating: something go wrong!');
                    _this.switchToAnotherScenario(userId, welcome_scenario_1.WelcomeScenario, params);
                    return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
    };
    NewDietScenario.prototype.getTargetKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.TargetLoss), diet_scenario_utils_1.DietScenarioUtils.LOSS_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.TargetSupport), diet_scenario_utils_1.DietScenarioUtils.SUPPORT_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.TargetGain), diet_scenario_utils_1.DietScenarioUtils.GAIN_CALLBACK)
            .result;
    };
    NewDietScenario.prototype.getMealsAmountKeyboard = function () {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton('3', diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_3)
            .addButton('4', diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_4)
            .addButton('5', diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_5)
            .addButton('6', diet_scenario_utils_1.DietScenarioUtils.MEAL_AMOUNT_6)
            .result;
    };
    NewDietScenario.prototype.getExcludeKeyboard = function (lang) {
        this._excludeKeyboard = new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeMeat), diet_scenario_utils_1.DietScenarioUtils.FOOD_MEAT, true)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypePoultry), diet_scenario_utils_1.DietScenarioUtils.FOOD_POULTRY, true)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeFish), diet_scenario_utils_1.DietScenarioUtils.FOOD_FISH, true)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeSeafood), diet_scenario_utils_1.DietScenarioUtils.FOOD_SEAFOOD, true)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeEggs), diet_scenario_utils_1.DietScenarioUtils.FOOD_EGGS, true)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeFruits), diet_scenario_utils_1.DietScenarioUtils.FOOD_FRUITS, true)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeMilk), diet_scenario_utils_1.DietScenarioUtils.FOOD_MILK, true)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeSportNutrition), diet_scenario_utils_1.DietScenarioUtils.FOOD_SPORT_NUTRITION, true)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FoodTypeExpensive), diet_scenario_utils_1.DietScenarioUtils.FOOD_EXPENSIVE, true)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonContinue), diet_scenario_utils_1.DietScenarioUtils.CONTINUE);
        return this._excludeKeyboard.result;
    };
    NewDietScenario.prototype.getFormationKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FormationVariety), diet_scenario_utils_1.DietScenarioUtils.FORMATION_VARIETY_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.FormationMonotony), diet_scenario_utils_1.DietScenarioUtils.FORMATION_MONOTONY_CALLBACK)
            .result;
    };
    NewDietScenario.prototype.getResultKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonSave), diet_scenario_utils_1.DietScenarioUtils.RESULT_SAVE_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonBack), diet_scenario_utils_1.DietScenarioUtils.BACK_CALLBACK)
            .result;
    };
    NewDietScenario.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return NewDietScenario;
}(scenario_1.Scenario));
exports.NewDietScenario = NewDietScenario;
