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
    Diet.prototype.refresh = function (user) {
        this.calculateDiet(user);
    };
    Diet.prototype.getMeal = function (name, lang) {
        var result = localization_1.Localization.loc(lang, diet_utils_1.DietUtils.getMealLocId(name)) + ':';
        if (this._content.diet && this._content.diet[name]) {
            var meal = this._content.diet[name];
            meal.forEach(function (food) {
                var consumableId = diet_utils_1.DietUtils.getConsumableLocId(food.consumable);
                var consumable;
                if (consumableId) {
                    consumable = localization_1.Localization.loc(lang, consumableId);
                }
                result += '\n- ' + localization_1.Localization.loc(lang, food.locId) +
                    (consumable ? (' ' + food.amount + (consumable + ";")) : ';');
            });
            utils_1.logDiet(result);
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
        utils_1.logDiet('Available food types:', (function () {
            var result = [];
            types.forEach(function (value) { result.push(food_1.FoodType[value]); });
            return result;
        })());
        var list = {
            complexProtein: this.getAvailableFood([food_1.Food.Salmon, food_1.Food.Seafood, food_1.Food.LeanBeef, food_1.Food.PoultryLeg, food_1.Food.Soybean], types, formation),
            isolateProtein: this.getAvailableFood([food_1.Food.WhiteFish, food_1.Food.PoultryFillet, food_1.Food.EggWhite, food_1.Food.SkimCheese, food_1.Food.Soybean], types, formation),
            snackProtein: this.getAvailableFood([food_1.Food.Protein, food_1.Food.EggWhite, food_1.Food.SkimCheese, food_1.Food.Soybean], types),
            morningCarbo: this.getAvailableFood([food_1.Food.Oatmeal, food_1.Food.BreadRolls, food_1.Food.Couscous], types, formation),
            dayCarbo: this.getAvailableFood([food_1.Food.MassPorridge, food_1.Food.BrownRice, food_1.Food.Buckwheat, food_1.Food.Beans, food_1.Food.Couscous], types, formation),
            lowCarbo: this.getAvailableFood([food_1.Food.Salad], types),
            snackCarbo: this.getAvailableFood([food_1.Food.Banana, food_1.Food.Apple, food_1.Food.Grapefruit, food_1.Food.Honey], types),
            addCarbo: this.getAvailableFood([food_1.Food.Berries, food_1.Food.DriedFruits, food_1.Food.Kiwi], types),
            mainFats: this.getAvailableFood([food_1.Food.Nuts, food_1.Food.Oil, food_1.Food.Avocado], types),
            addFats: this.getAvailableFood([food_1.Food.FishOil, food_1.Food.Oil], types),
        };
        var egg = this.getFoodDescription(food_1.Food.Egg, types);
        var cheese = this.getFoodDescription(food_1.Food.Cheese, types);
        var protein = this.getFoodDescription(food_1.Food.Protein, types);
        cheese && list.complexProtein.push(cheese);
        egg && list.complexProtein.push(egg);
        if (list.isolateProtein.length === 0 && protein) {
            list.isolateProtein.push(protein);
        }
        var totalCalories = this.getTotalCalories(weight, this.getFatPercent(this.getWeightIndex(weight, height, bodyType, age), gender), activity, target);
        utils_1.logDiet('Total calories:', totalCalories);
        var targetSchedule = diet_utils_1.DietUtils.getDailyRequirements(target);
        var dailyRequirements = {
            protein: Math.round(totalCalories * targetSchedule.protein * 0.01 / config_1.Config.proteinCalories),
            fat: Math.round(totalCalories * targetSchedule.fat * 0.01 / config_1.Config.fatCalories),
            carbo: Math.round(totalCalories * targetSchedule.carbo * 0.01 / config_1.Config.carboCalories)
        };
        utils_1.logDiet('Daily requirements', dailyRequirements);
        var dailySchedule = diet_utils_1.DietUtils.getDaySchedule(meals);
        var diet = {};
        dailySchedule.forEach(function (config) {
            utils_1.logDiet('------------', config.name, '------------');
            var mealRequirements = {
                protein: Math.round(dailyRequirements.protein * config.nutrients.protein * 0.01),
                fat: Math.round(dailyRequirements.fat * config.nutrients.fat * 0.01),
                carbo: Math.round(dailyRequirements.carbo * config.nutrients.carbo * 0.01),
            };
            utils_1.logDiet('Meal calories', mealRequirements.protein * 4 + mealRequirements.fat * 9 + mealRequirements.carbo * 4);
            var options = {
                isSnack: diet_utils_1.DietUtils.isSnackMeal(config.name),
                isFastCarboAvailable: diet_utils_1.DietUtils.isFastCarboAvailable(target, config.name),
                isMorning: config.name === diet_utils_1.MealName.Breakfast || config.name === diet_utils_1.MealName.Brunch,
                maxMorningCarbo: target === diet_utils_1.DietTarget.Gain ? weight * config_1.Config.maxDayCarboMul : weight * config_1.Config.maxMorningCarboMul,
                maxDayCarbo: weight * config_1.Config.maxDayCarboMul
            };
            diet[config.name] = _this.calculateDay(mealRequirements, list, options);
        });
        utils_1.logDiet('--------------------------------------');
        this._content.diet = diet;
        return true;
    };
    Diet.prototype.calculateDay = function (nutrients, list, options) {
        var result = [];
        //PROTEIN
        if (nutrients.protein > 0) {
            if (!options.isSnack) {
                if (nutrients.fat > 0) { //complex protein
                    utils_1.logDiet('Complex protein:', nutrients);
                    this.addFoodToList(result, this.findMeal(nutrients, list.complexProtein));
                }
                else { //isolate protein
                    utils_1.logDiet('Isolate protein:', nutrients);
                    this.addFoodToList(result, this.findMeal(nutrients, list.isolateProtein));
                }
            }
            if (nutrients.protein > 0) { //snack protein
                utils_1.logDiet('Snack protein:', nutrients);
                this.addFoodToList(result, this.findMeal(nutrients, list.snackProtein));
            }
        }
        //CARBO
        if (nutrients.carbo > 0) {
            if (options.isSnack && options.isFastCarboAvailable && nutrients.carbo >= config_1.Config.minSnackCarboPortion) { // 20g snack carbo
                utils_1.logDiet('Snack carbo:', nutrients);
                this.addFoodToList(result, this.findMeal(nutrients, list.snackCarbo, config_1.Config.minSnackCarboPortion));
            }
            if (options.isMorning) { // morning carbo (max morning carbo)
                utils_1.logDiet('Morninig carbo:', nutrients);
                this.addFoodToList(result, this.findMeal(nutrients, list.morningCarbo, options.maxMorningCarbo));
            }
            else { // main carbo (max day carbo)
                utils_1.logDiet('Daily carbo:', nutrients);
                this.addFoodToList(result, this.findMeal(nutrients, list.dayCarbo, options.maxDayCarbo));
            }
            if (nutrients.carbo > 0 && options.isFastCarboAvailable) { //fast carbo
                utils_1.logDiet('Fast carbo:', nutrients);
                this.addFoodToList(result, this.findMeal(nutrients, list.addCarbo));
            }
            if (nutrients.carbo > 0 && options.isFastCarboAvailable) { //low carbo
                utils_1.logDiet('Low carbo:', nutrients);
                this.addFoodToList(result, this.findMeal(nutrients, list.lowCarbo));
            }
        }
        //FAT
        if (nutrients.fat > config_1.Config.minFatPortion) { // main fat
            utils_1.logDiet('Main fats:', nutrients);
            this.addFoodToList(result, this.findMeal(nutrients, list.mainFats));
        }
        else if (nutrients.fat > 0) { // add fat
            utils_1.logDiet('Add fats:', nutrients);
            this.addFoodToList(result, this.findMeal(nutrients, list.addFats));
        }
        if (nutrients.protein > 0 || nutrients.fat > 0 || nutrients.carbo > 0) {
            utils_1.logDiet('!!! Nutrients lost:', nutrients, nutrients.protein * 4 + nutrients.fat * 9 + nutrients.carbo * 4);
        }
        return result;
    };
    Diet.prototype.addFoodToList = function (list, meal) {
        if (meal) {
            list.push(meal);
        }
    };
    Diet.prototype.findMeal = function (totalNutrients, originList, maxAmount) {
        if (originList.length === 0) {
            return undefined;
        }
        var myList = originList.slice();
        var repeats = 0;
        var meal;
        var description;
        do {
            description = this.getRandomFoodDescription(myList, true);
            meal = undefined;
            if (description) {
                meal = this.calculateMeal(totalNutrients, description, maxAmount);
            }
            repeats++;
        } while (!meal && repeats < config_1.Config.mealFindTries && myList.length > 0);
        if (meal) {
            if (description && description.oneUse === true && originList.length > 1) {
                var index = originList.indexOf(description);
                if (index >= 0) {
                    utils_1.logDiet('!Only one use', localization_1.LocId[description.locId], 'removed!');
                    originList.splice(index, 1);
                }
            }
            return meal;
        }
        return undefined;
    };
    Diet.prototype.calculateMeal = function (totalNutrients, description, maxAmount) {
        var protein = description.protein, fat = description.fat, carbo = description.carbo, consumable = description.consumable, locId = description.locId;
        var mul = diet_utils_1.DietUtils.isConsumableCountable(consumable) ? 1 : .01;
        var amountByProtein = protein > 0 ? totalNutrients.protein / (protein * mul) : Number.MAX_VALUE;
        var amountByFat = fat > 0 ? totalNutrients.fat / (fat * mul) : Number.MAX_VALUE;
        var amountByCarbo = carbo > 0 ? totalNutrients.carbo / (carbo * mul) : Number.MAX_VALUE;
        var amount = Math.min(amountByProtein, amountByFat, amountByCarbo, description.max ? description.max : Number.MAX_VALUE, maxAmount ? maxAmount : Number.MAX_VALUE);
        if (diet_utils_1.DietUtils.isConsumableCountable(consumable)) {
            if (consumable !== food_1.FoodConsumable.Unit) {
                amount = Math.floor(amount * 2) * .5;
            }
            else {
                amount = Math.floor(amount);
            }
            if (amount < config_1.Config.minPieceValue) {
                utils_1.logDiet('- Food:', localization_1.LocId[locId], "not enough " + amount + " (min " + config_1.Config.minPieceValue + " piece)");
                return undefined;
            }
        }
        else {
            amount = Math.round(amount * .1) * 10;
        }
        if (description.min) {
            if (amount < description.min) {
                utils_1.logDiet('- Food:', localization_1.LocId[locId], "not enough " + amount + " (min value " + description.min + ")");
                return undefined;
            }
        }
        var mealNutrients = {
            protein: Math.round(amount * description.protein * mul),
            fat: Math.round(amount * description.fat * mul),
            carbo: Math.round(amount * description.carbo * mul)
        };
        utils_1.logDiet('* Food:', localization_1.LocId[locId], 'x' + amount, mealNutrients, mealNutrients.protein * 4 + mealNutrients.fat * 9 + mealNutrients.carbo * 4);
        totalNutrients.protein -= mealNutrients.protein;
        totalNutrients.fat -= mealNutrients.fat;
        totalNutrients.carbo -= mealNutrients.carbo;
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
        utils_1.logDiet('Weight index:', index);
        return index;
    };
    Diet.prototype.getFatPercent = function (indexWeight, gender) {
        var K = ((0.05 * indexWeight) / (1.3 + 0.021 * indexWeight));
        var result = Math.round(indexWeight * K + 4);
        if (gender === user_1.Gender.Female) {
            result += config_1.Config.femaleFatPercentBonus;
        }
        utils_1.logDiet('Fat %:', result);
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
                utils_1.logDiet('--- Filter', food_1.Food[food], "rejected (only " + food_1.FoodType[description.type[i]] + ")");
                return undefined;
            }
        }
        utils_1.logDiet('+++ Filter', food_1.Food[food], 'accepted.');
        return description;
    };
    Diet.prototype.getAvailableFood = function (types, availableTypes, formation) {
        var _this = this;
        var result = [];
        types.forEach(function (type) {
            var description = _this.getFoodDescription(type, availableTypes);
            if (description) {
                result.push(description);
            }
        });
        if (result.length > 0 && utils_1.isSomething(formation) && formation === diet_utils_1.Formation.Monotony) {
            return [
                this.getRandomFoodDescription(result)
            ];
        }
        return result;
    };
    Diet.prototype.getRandomFoodDescription = function (list, removeAfter) {
        if (removeAfter === void 0) { removeAfter = false; }
        if (list.length === 0) {
            return undefined;
        }
        var index = Math.floor(Math.random() * list.length);
        var result = list[index];
        if (removeAfter) {
            list.splice(index, 1);
        }
        return result;
    };
    return Diet;
}());
exports.Diet = Diet;
