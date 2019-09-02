"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var food_1 = require("./food");
var utils_1 = require("../utils/utils");
var diet_utils_1 = require("./diet-utils");
var user_1 = require("../user/user");
var config_1 = require("../configs/config");
var localization_1 = require("../localization/localization");
var Diet = /** @class */ (function () {
    function Diet() {
        this._content = {};
    }
    Diet.prototype.getDiet = function (user, lang) {
        if (this._content.diet || this.calculateDiet(user)) {
            var diet = this._content.diet;
            var result = '';
            if (diet[diet_utils_1.MealName.Breakfast]) {
                result += this.getMeal(diet_utils_1.MealName.Breakfast, lang);
            }
            if (diet[diet_utils_1.MealName.Brunch]) {
                result += '\n' + this.getMeal(diet_utils_1.MealName.Brunch, lang);
            }
            if (diet[diet_utils_1.MealName.Lunch]) {
                result += '\n' + this.getMeal(diet_utils_1.MealName.Lunch, lang);
            }
            if (diet[diet_utils_1.MealName.HighTea]) {
                result += '\n' + this.getMeal(diet_utils_1.MealName.HighTea, lang);
            }
            if (diet[diet_utils_1.MealName.Dinner]) {
                result += '\n' + this.getMeal(diet_utils_1.MealName.Dinner, lang);
            }
            if (diet[diet_utils_1.MealName.LateDinner]) {
                result += '\n' + this.getMeal(diet_utils_1.MealName.LateDinner, lang);
            }
            return result;
        }
        return undefined;
    };
    Diet.prototype.getMeal = function (name, lang) {
        var result = localization_1.Localization.loc(lang, diet_utils_1.DietUtils.getMealLocId(name)) + ':';
        if (this._content.diet && this._content.diet[name]) {
            var meal = this._content.diet[name];
            meal.forEach(function (food) {
                var consumable = localization_1.Localization.loc(lang, diet_utils_1.DietUtils.getConsumableLocId(food.consumable));
                result += '\n- ' + localization_1.Localization.loc(lang, food.locId) + ' ' + food.amount + (" " + consumable + ";");
            });
        }
        return result;
    };
    Diet.prototype.calculateDiet = function (user) {
        var _this = this;
        var _a = this._content, target = _a.target, meals = _a.meals, formation = _a.formation, excludes = _a.excludes;
        if (!utils_1.isSomething(target) || !utils_1.isSomething(meals) || !utils_1.isSomething(formation) || !utils_1.isSomething(excludes)) {
            return false;
        }
        var _b = user.properties, weight = _b.weight, height = _b.height, gender = _b.gender, activity = _b.activity, bodyType = _b.bodyType, age = _b.age;
        if (!utils_1.isSomething(weight) || !utils_1.isSomething(height)
            || !utils_1.isSomething(gender) || !utils_1.isSomething(activity)
            || !utils_1.isSomething(bodyType) || !utils_1.isSomething(age)) {
            return false;
        }
        var types = this.getAvailableFoodTypes(excludes, target);
        utils_1.log('Available food types:', types);
        var list = {
            complexProtein: this.getAvailableFood([food_1.Food.Salmon, food_1.Food.Seafood, food_1.Food.LeanBeef, food_1.Food.PoultryThigh, food_1.Food.Soybean], types, formation),
            isolateProtein: this.getAvailableFood([food_1.Food.WhiteFish, food_1.Food.PoultryFillet, food_1.Food.EggWhite, food_1.Food.SkimCheese, food_1.Food.Soybean], types, formation),
            proteinSnack: this.getAvailableFood([food_1.Food.Protein, food_1.Food.EggWhite, food_1.Food.SkimCheese, food_1.Food.Soybean], types),
            dayCarbo: this.getAvailableFood([food_1.Food.MassPorridge, food_1.Food.BrownRice, food_1.Food.Buckwheat, food_1.Food.Beans], types, formation),
            lowCarbo: this.getAvailableFood([food_1.Food.Broccoli], types),
            fastCarbo: this.getAvailableFood([food_1.Food.Berries, food_1.Food.Banana, food_1.Food.Apple], types),
            mainFats: this.getAvailableFood([food_1.Food.Nuts, food_1.Food.Oil, food_1.Food.Avocado], types),
            addFats: this.getAvailableFood([food_1.Food.FishOil, food_1.Food.Oil], types),
            morningCarbo: this.getAvailableFood([food_1.Food.Oatmeal], types, formation),
        };
        var egg = this.getFoodDescription(food_1.Food.Egg, types);
        var cheese = this.getFoodDescription(food_1.Food.Cheese, types);
        var protein = this.getFoodDescription(food_1.Food.Protein, types);
        if (list.complexProtein.length === 0) {
            egg && list.isolateProtein.push(egg);
            cheese && list.isolateProtein.push(cheese);
        }
        if (list.isolateProtein.length === 0 && protein) {
            list.isolateProtein.push(protein);
        }
        var totalCalories = this.getTotalCalories(weight, this.getFatPercent(this.getWeightIndex(weight, height, bodyType, age), gender), activity, target);
        utils_1.log('Total calories:', totalCalories);
        var targetSchedule = diet_utils_1.DietUtils.getDailyRequirements(target);
        var dailyRequirements = {
            protein: Math.round(totalCalories * targetSchedule.protein * 0.01 / config_1.Config.proteinCalories),
            fat: Math.round(totalCalories * targetSchedule.fat * 0.01 / config_1.Config.fatCalories),
            carbo: Math.round(totalCalories * targetSchedule.carbo * 0.01 / config_1.Config.carboCalories)
        };
        utils_1.log('Daily requirements', dailyRequirements);
        var dailySchedule = diet_utils_1.DietUtils.getDaySchedule(meals);
        var diet = {};
        dailySchedule.forEach(function (config) {
            utils_1.log('------------', config.name, '------------');
            var mealRequirements = {
                protein: Math.round(dailyRequirements.protein * config.nutrients.protein * 0.01),
                fat: Math.round(dailyRequirements.fat * config.nutrients.fat * 0.01),
                carbo: Math.round(dailyRequirements.carbo * config.nutrients.carbo * 0.01),
            };
            utils_1.log('Meal requirements', mealRequirements);
            var options = {
                isSnack: diet_utils_1.DietUtils.isSnackMeal(config.name),
                isFastCarboAvailable: diet_utils_1.DietUtils.isFastCarboAvailable(target, config.name),
                isMorning: config.name === diet_utils_1.MealName.Breakfast || config.name === diet_utils_1.MealName.Brunch,
                maxMorningCarbo: weight * config_1.Config.maxMorningCarboMul,
                maxDayCarbo: weight * config_1.Config.maxDayCarboMul
            };
            diet[config.name] = _this.calculateDay(mealRequirements, list, options);
        });
        this._content.diet = diet;
        return true;
    };
    Diet.prototype.calculateDay = function (nutrients, list, options) {
        var result = [];
        if (nutrients.protein > 0) {
            if (!options.isSnack) {
                if (nutrients.fat > 0) { //complex protein
                    utils_1.log('Complex protein');
                    this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.complexProtein)));
                }
                else { //isolate protein
                    utils_1.log('Isolate protein');
                    this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.isolateProtein)));
                }
            }
            if (nutrients.protein > 0) { //snack protein
                utils_1.log('Snack protein');
                this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.proteinSnack)));
            }
        }
        if (nutrients.fat > config_1.Config.minFatPortion) { // main fat
            utils_1.log('Main fats');
            this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.mainFats)));
        }
        else if (nutrients.fat > 0) { // add fat
            utils_1.log('Add fats');
            this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.addFats)));
        }
        if (options.isSnack && options.isFastCarboAvailable && nutrients.carbo >= config_1.Config.minSnackCarboPortion) { // 20g fast carbo
            utils_1.log('Snack carbo potion');
            this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.fastCarbo), config_1.Config.minSnackCarboPortion));
        }
        if (nutrients.carbo > 0) {
            if (options.isMorning) { // morning carbo (max morning carbo)
                utils_1.log('Morninig carbo');
                this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.morningCarbo), options.maxMorningCarbo));
            }
            else { // main carbo (max day carbo)
                utils_1.log('Daily carbo');
                this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.dayCarbo), options.maxDayCarbo));
            }
            if (nutrients.carbo > 0) {
                if (options.isFastCarboAvailable) { //fast carbo
                    utils_1.log('Fast carbo');
                    this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.fastCarbo)));
                }
                else { //low carbo
                    utils_1.log('Low carbo');
                    this.addFoodToList(result, this.calculateFood(nutrients, this.getRandomFoodDescription(list.lowCarbo)));
                }
            }
        }
        return result;
    };
    Diet.prototype.addFoodToList = function (list, meal) {
        if (meal) {
            list.push(meal);
        }
    };
    Diet.prototype.calculateFood = function (nutrients, description, maxAmount) {
        var protein = description.protein, fat = description.fat, carbo = description.carbo, consumable = description.consumable, locId = description.locId;
        var amountByProtein = protein > 0 ? nutrients.protein / (protein * 0.01) : Number.MAX_VALUE;
        var amountByFat = fat > 0 ? nutrients.fat / (fat * 0.01) : Number.MAX_VALUE;
        var amountByCarbo = carbo > 0 ? nutrients.carbo / (carbo * 0.01) : Number.MAX_VALUE;
        var amount = Math.min(amountByProtein, amountByFat, amountByCarbo, maxAmount ? maxAmount : Number.MAX_VALUE);
        if (consumable !== food_1.FoodConsumable.Weight) {
            utils_1.log('Consumable amount', amount);
            if (consumable !== food_1.FoodConsumable.Unit) {
                amount = Math.floor(amount * 2) * .5;
            }
            else {
                amount = Math.floor(amount);
            }
            if (amount < config_1.Config.minPieceValue) {
                utils_1.log('Food:', localization_1.LocId[locId], 'not enough');
                return undefined;
            }
            nutrients.protein -= amount * description.protein;
            nutrients.fat -= amount * description.fat;
            nutrients.carbo -= amount * description.carbo;
        }
        else {
            amount = Math.round(amount * .1) * 10;
            nutrients.protein -= amount * description.protein * .01;
            nutrients.fat -= amount * description.fat * .01;
            nutrients.carbo -= amount * description.carbo * .01;
        }
        amount = Math.round(amount);
        utils_1.log('Food:', localization_1.LocId[locId], 'amount:', amount);
        return { locId: locId, amount: amount, consumable: consumable };
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
        result = result.filter(function (value) { return !excludes.includes(value); });
        if (!result.includes(food_1.FoodType.Meat) && !result.includes(food_1.FoodType.Poultry) && !result.includes(food_1.FoodType.Fish) &&
            !result.includes(food_1.FoodType.Seafood) && !result.includes(food_1.FoodType.Eggs) && !result.includes(food_1.FoodType.Milk)) {
            result.push(food_1.FoodType.Vegan);
        }
        if (target === diet_utils_1.DietTarget.Loss) {
            result.push(food_1.FoodType.Loss);
        }
        else if (target === diet_utils_1.DietTarget.Support) {
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
        utils_1.log('Weight index:', index);
        return index;
    };
    Diet.prototype.getFatPercent = function (indexWeight, gender) {
        var K = ((0.05 * indexWeight) / (1.3 + 0.021 * indexWeight));
        var result = Math.round(indexWeight * K + 4);
        if (gender === user_1.Gender.Female) {
            result += config_1.Config.femaleFatPercentBonus;
        }
        utils_1.log('Fat %:', result);
        return result;
    };
    Diet.prototype.getTotalCalories = function (weight, fatPercent, activity, target) {
        var result = 370 + (21.6 * weight * (100 - fatPercent)) / 100;
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
        if (target === diet_utils_1.DietTarget.Loss) {
            result *= 0.7;
        }
        else if (target === diet_utils_1.DietTarget.Gain) {
            result *= 1.2;
        }
        return Math.round(result / 100) * 100;
    };
    Diet.prototype.getFoodDescription = function (food, availableTypes) {
        var description = food_1.FOOD[food];
        for (var i in description.type) {
            if (!availableTypes.includes(description.type[i])) {
                return undefined;
            }
        }
        return description;
    };
    Diet.prototype.getAvailableFood = function (types, availableTypes, formation) {
        var _this = this;
        var result = [];
        types.forEach(function (type) {
            var description = _this.getFoodDescription(type, availableTypes);
            if (description) {
                utils_1.log('+++ Food', food_1.Food[type], 'accepted.');
                result.push(description);
            }
            else {
                utils_1.log('--- Food', food_1.Food[type], 'rejected.');
            }
        });
        if (utils_1.isSomething(formation) && formation === diet_utils_1.Formation.Monotony) {
            return [
                this.getRandomFoodDescription(result)
            ];
        }
        return result;
    };
    Diet.prototype.getRandomFoodDescription = function (list) {
        return list[Math.floor(Math.random() * list.length)];
    };
    return Diet;
}());
exports.Diet = Diet;
