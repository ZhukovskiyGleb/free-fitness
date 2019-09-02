"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var food_1 = require("./food");
var utils_1 = require("../utils/utils");
var diet_config_1 = require("../configs/diet-config");
var user_1 = require("../user/user");
var config_1 = require("../configs/config");
var Diet = /** @class */ (function () {
    function Diet() {
        this._content = {};
    }
    Diet.prototype.getDiet = function () {
        if (this._content.diet || this.calculateDiet()) {
            var diet = this._content.diet;
            return '';
        }
        return undefined;
    };
    Diet.prototype.calculateDiet = function () {
        var _a = this._content, target = _a.target, days = _a.meals, formation = _a.formation, excludes = _a.excludes;
        if (utils_1.isSomething(target) && utils_1.isSomething(days) && utils_1.isSomething(formation) && utils_1.isSomething(excludes)) {
            var types = this.getAvailableFoodTypes(excludes, target);
            return true;
        }
        return false;
    };
    Diet.prototype.setTarget = function (target) {
        this._content.target = target;
    };
    Diet.prototype.setMealsAmount = function (days) {
        this._content.meals = days;
    };
    Diet.prototype.setExcludes = function (excludes) {
        this._content.excludes = excludes;
    };
    Diet.prototype.setFormation = function (formation) {
        this._content.formation = formation;
    };
    Diet.prototype.getAvailableFoodTypes = function (excludes, target) {
        var result = [food_1.FoodType.Meat, food_1.FoodType.Poultry, food_1.FoodType.Fish,
            food_1.FoodType.Seafood, food_1.FoodType.Eggs, food_1.FoodType.Milk,
            food_1.FoodType.Fruits, food_1.FoodType.Expensive, food_1.FoodType.SportNutrition];
        result.filter(function (value) { return !excludes.includes(value); });
        if (!result.includes(food_1.FoodType.Meat) && !result.includes(food_1.FoodType.Poultry) && !result.includes(food_1.FoodType.Fish) &&
            !result.includes(food_1.FoodType.Seafood) && !result.includes(food_1.FoodType.Eggs) && !result.includes(food_1.FoodType.Milk)) {
            result.push(food_1.FoodType.Vegan);
        }
        if (target === diet_config_1.DietTarget.Loss) {
            result.push(food_1.FoodType.Loss);
        }
        else if (target === diet_config_1.DietTarget.Support) {
            result.push(food_1.FoodType.GainSupport);
        }
        else {
            result.push(food_1.FoodType.GainSupport);
            result.push(food_1.FoodType.Gain);
        }
        return result;
    };
    Diet.prototype.getWeightIndex = function (weight, height, bodyType, age) {
        var index = Math.round(weight / (height * height * 0.0001));
        if (bodyType === user_1.BodyType.Large || age > config_1.Config.ageAfterWeightIndexLoss) {
            index -= config_1.Config.largeOldIndexWeightLoss;
        }
        else if (bodyType === user_1.BodyType.Muscular) {
            index -= config_1.Config.muscularIndexWeightLoss;
        }
        return index;
    };
    Diet.prototype.getFatPercent = function (indexWeight, gender) {
        var K = ((0.05 * indexWeight) / (1.3 + 0.021 * indexWeight));
        var result = Math.round(indexWeight * K);
        if (gender === user_1.Gender.Female) {
            result += config_1.Config.femaleFatPercentBonus;
        }
        return result;
    };
    Diet.prototype.getDailyCalorie = function (weight, fatPercent, activity, target) {
        var result = 370 + 21.6 * weight * (100 - fatPercent) / 100;
        switch (activity) {
            case user_1.Activity.Easy:
                result *= 1.4;
                break;
            case user_1.Activity.Average:
                result *= 1.6;
                break;
            case user_1.Activity.Heavy:
                result *= 1.8;
                break;
            default:
                result *= 1.2;
                break;
        }
        if (target === diet_config_1.DietTarget.Loss) {
            result *= 0.8;
        }
        else if (target === diet_config_1.DietTarget.Gain) {
            result *= 1.8;
        }
        return result;
    };
    return Diet;
}());
exports.Diet = Diet;
