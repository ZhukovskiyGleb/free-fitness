import {FOOD, Food, FoodConsumable, FoodDescription, FoodType} from "./food";
import {isSomething, logDiet} from "../../utils/utils";
import {DietMealsAmount, DietTarget, DietUtils, Formation, MealName, Nutrients} from "./diet-utils";
import {Activity, BodyType, Gender, User} from "../../user/user";
import {Config} from "../../configs/config";
import {Localization, LocId} from "../../localization/localization";

interface Content {
    target?: DietTarget,
    meals?: DietMealsAmount,
    excludes?: FoodType[],
    formation?: Formation,
    diet?: DietMealConfig
}

type DietMealConfig = {[key in MealName]?: DietMeal[]};

interface DietMeal {
    locId: LocId, amount: number, consumable: FoodConsumable
}

interface FoodList {
    complexProtein: FoodDescription[],
    isolateProtein: FoodDescription[],
    snackProtein: FoodDescription[],
    morningCarbo: FoodDescription[],
    dayCarbo: FoodDescription[],
    lowCarbo: FoodDescription[],
    snackCarbo: FoodDescription[],
    addCarbo: FoodDescription[],
    mainFats: FoodDescription[],
    addFats: FoodDescription[],
}

interface MealOptions {
    isSnack: boolean,
    isFastCarboAvailable: boolean,
    isMorning: boolean,
    maxMorningCarbo: number,
    maxDayCarbo: number
}

export class Workout {
    private readonly _content: Content = {};

    public getWorkout(user: User, lang: string): string | undefined {
        if (this._content.diet || this.calculateDiet(user)) {
            const diet = this._content.diet!;

            let result = '';

            if (diet[MealName.Breakfast]) {
                result += this.getMeal(MealName.Breakfast, lang);
            }
            if (diet[MealName.Brunch]) {
                result += '\n' + this.getMeal(MealName.Brunch, lang);
            }
            if (diet[MealName.Lunch]) {
                result += '\n' + this.getMeal(MealName.Lunch, lang);
            }
            if (diet[MealName.HighTea]) {
                result += '\n' + this.getMeal(MealName.HighTea, lang);
            }
            if (diet[MealName.Dinner]) {
                result += '\n' + this.getMeal(MealName.Dinner, lang);
            }
            if (diet[MealName.LateDinner]) {
                result += '\n' + this.getMeal(MealName.LateDinner, lang);
            }

            return result;
        }

        return undefined;
    }

    public refresh(user: User): void {
        this.calculateDiet(user);
    }

    private getMeal(name: MealName, lang: string): string {
        let result = Localization.loc(lang, DietUtils.getMealLocId(name)) + ':';
        if (this._content.diet && this._content.diet[name]) {
            const meal = this._content.diet[name]!;
            meal.forEach((food, index) => {
                const consumableId = DietUtils.getConsumableLocId(food.consumable);
                let consumable;
                if (consumableId) {
                     consumable = Localization.loc(lang, consumableId);
                }

                result += '\n- ' + Localization.loc(lang, food.locId) +
                  (consumable ? (' ' + food.amount + `${consumable}`) : '') +
                  (index < meal.length - 1 ? ';' : '.');
            });
            logDiet(result);
        }
        return result;
    }

    private calculateDiet(user: User): boolean {
        const {target, meals, formation, excludes} = this._content;
        if (!isSomething(target) || !isSomething(meals) || !isSomething(formation) || !isSomething(excludes)) {
            return false;
        }

        const {weight, height, gender, activity, bodyType, age} = user.properties;

        if (!isSomething(weight) || !isSomething(height)
          || !isSomething(gender) || !isSomething(activity)
          || !isSomething(bodyType) || !isSomething(age)) {
            return false;
        }

        const types = this.getAvailableFoodTypes(excludes, target);

        logDiet('Available food types:', (() => {
            const result: string[] = [];
            types.forEach(value => {result.push(FoodType[value])});
            return result;
        })());

        const list: FoodList = {
            complexProtein: this.getAvailableFood([Food.Salmon, Food.Seafood, Food.LeanBeef, Food.PoultryLeg, Food.Soybean], types, formation),
            isolateProtein: this.getAvailableFood([Food.WhiteFish, Food.PoultryFillet, Food.EggWhite, Food.SkimCheese, Food.Soybean], types, formation),
            snackProtein: this.getAvailableFood([Food.Protein, Food.EggWhite, Food.SkimCheese, Food.Soybean], types),
            morningCarbo: this.getAvailableFood([Food.Oatmeal, Food.BreadRolls, Food.Couscous], types, formation),
            dayCarbo: this.getAvailableFood([Food.MassPorridge, Food.BrownRice, Food.Buckwheat, Food.Beans, Food.Couscous], types, formation),
            lowCarbo: this.getAvailableFood([Food.Salad], types),
            snackCarbo: this.getAvailableFood([Food.Banana, Food.Apple, Food.Grapefruit, Food.Honey], types),
            addCarbo: this.getAvailableFood([Food.Berries, Food.DriedFruits, Food.Kiwi], types),
            mainFats: this.getAvailableFood([Food.Nuts, Food.Oil, Food.Avocado], types),
            addFats: this.getAvailableFood([Food.FishOil, Food.Oil], types),
        };

        const egg = this.getFoodDescription(Food.Egg, types);
        const cheese = this.getFoodDescription(Food.Cheese, types);
        const protein = this.getFoodDescription(Food.Protein, types);

        cheese && list.complexProtein.push(cheese);
        egg && list.complexProtein.push(egg);

        if (list.isolateProtein.length === 0 && protein) {
            list.isolateProtein.push(protein);
        }

        const totalCalories = this.getTotalCalories(
          weight,
          this.getFatPercent(
            this.getWeightIndex(weight, height, bodyType, age),
            gender
          ),
          activity,
          target
        );
        logDiet('Total calories:', totalCalories);

        const targetSchedule = DietUtils.getDailyRequirements(target);

        const dailyRequirements: Nutrients = {
            protein: Math.round(totalCalories * targetSchedule.protein * 0.01 / Config.proteinCalories),
            fat: Math.round(totalCalories * targetSchedule.fat * 0.01 / Config.fatCalories),
            carbo: Math.round(totalCalories * targetSchedule.carbo * 0.01 / Config.carboCalories)
        };
        logDiet('Daily requirements', dailyRequirements);

        const dailySchedule = DietUtils.getDaySchedule(meals);

        const diet: DietMealConfig = {};

        dailySchedule.forEach(config => {
            logDiet('------------', config.name, '------------');
            const mealRequirements: Nutrients = {
                protein: Math.round(dailyRequirements.protein * config.nutrients.protein * 0.01),
                fat: Math.round(dailyRequirements.fat * config.nutrients.fat * 0.01),
                carbo: Math.round(dailyRequirements.carbo * config.nutrients.carbo * 0.01),
            };
            logDiet('Meal calories', mealRequirements.protein * 4 + mealRequirements.fat * 9 + mealRequirements.carbo * 4);
            const options: MealOptions = {
                isSnack: DietUtils.isSnackMeal(config.name),
                isFastCarboAvailable: DietUtils.isFastCarboAvailable(target, config.name),
                isMorning: config.name === MealName.Breakfast || config.name === MealName.Brunch,
                maxMorningCarbo: target === DietTarget.Gain ? weight * Config.maxDayCarboMul : weight * Config.maxMorningCarboMul,
                maxDayCarbo: weight * Config.maxDayCarboMul
            };

            diet[config.name] = this.calculateDay(
                mealRequirements,
                list,
                options
            );
        });
        logDiet('--------------------------------------');

        this._content.diet = diet;

        return true;
    }

    private calculateDay(nutrients: Nutrients, list: FoodList, options: MealOptions): DietMeal[] {
        const result: DietMeal[] = [];

        //PROTEIN
        if (nutrients.protein > 0) {
            if (!options.isSnack) {
                if (nutrients.fat > 0) {//complex protein
                    logDiet('Complex protein:', nutrients);
                    this.addFoodToList(result,
                        this.findMeal(nutrients, list.complexProtein)
                    )
                } else {//isolate protein
                    logDiet('Isolate protein:', nutrients);
                    this.addFoodToList(result,
                      this.findMeal(nutrients, list.isolateProtein)
                    )
                }
            }
            if (nutrients.protein > 0) {//snack protein
                logDiet('Snack protein:', nutrients);
                this.addFoodToList(result,
                  this.findMeal(nutrients, list.snackProtein)
                )
            }
        }
        //CARBO
        if (nutrients.carbo > 0) {
            if (options.isSnack && options.isFastCarboAvailable && nutrients.carbo >= Config.minSnackCarboPortion) {// 20g snack carbo
                logDiet('Snack carbo:', nutrients);
                this.addFoodToList(result,
                  this.findMeal(nutrients, list.snackCarbo, Config.minSnackCarboPortion)
                )
            }
            if (options.isMorning) {// morning carbo (max morning carbo)
                logDiet('Morninig carbo:', nutrients);
                this.addFoodToList(result,
                  this.findMeal(nutrients, list.morningCarbo, options.maxMorningCarbo)
                )
            } else {// main carbo (max day carbo)
                logDiet('Daily carbo:', nutrients);
                this.addFoodToList(result,
                  this.findMeal(nutrients, list.dayCarbo, options.maxDayCarbo)
                )
            }
            if (nutrients.carbo > 0 && options.isFastCarboAvailable) {//fast carbo
                logDiet('Fast carbo:', nutrients);
                this.addFoodToList(result,
                  this.findMeal(nutrients, list.addCarbo)
                )
            }
            if (nutrients.carbo > 0 && options.isFastCarboAvailable) {//low carbo
                logDiet('Low carbo:', nutrients);
                this.addFoodToList(result,
                  this.findMeal(nutrients, list.lowCarbo)
                )
            }
        }
        //FAT
        if (nutrients.fat > Config.minFatPortion) {// main fat
            logDiet('Main fats:', nutrients);
            this.addFoodToList(result,
              this.findMeal(nutrients, list.mainFats)
            )
        } else if (nutrients.fat > 0) {// add fat
            logDiet('Add fats:', nutrients);
            this.addFoodToList(result,
              this.findMeal(nutrients, list.addFats)
            )
        }

        if (nutrients.protein > 0 || nutrients.fat > 0 || nutrients.carbo > 0) {
            logDiet('!!! Nutrients lost:', nutrients, nutrients.protein * 4 + nutrients.fat * 9 + nutrients.carbo * 4);
        }

        return result;
    }

    private addFoodToList(list: DietMeal[], meal?: DietMeal): void {
        if (meal) {
            list.push(meal);
        }
    }

    private findMeal(totalNutrients: Nutrients, originList: FoodDescription[], maxAmount?: number): DietMeal | undefined {
        if (originList.length === 0) {
            return undefined;
        }

        const myList = originList.slice();
        let repeats = 0;
        let meal;
        let description;

        do {
            description = this.getRandomFoodDescription(myList, true);
            meal = undefined;

            if (description) {
                meal = this.calculateMeal(totalNutrients, description, maxAmount);
            }

            repeats ++;
        } while (!meal && repeats < Config.mealFindTries && myList.length > 0);

        if (meal) {
            if (description && description.oneUse === true && originList.length > 1) {
                const index = originList.indexOf(description);
                if (index >= 0) {
                    logDiet('!Only one use', LocId[description.locId], 'removed!');
                    originList.splice(index, 1);
                }
            }
            return meal;
        }
        return undefined;
    }

    private calculateMeal(totalNutrients: Nutrients, description: FoodDescription, maxAmount?: number): DietMeal | undefined {
        const { protein, fat, carbo, consumable, locId } = description;

        const mul = DietUtils.isConsumableCountable(consumable) ? 1 : .01;

        const amountByProtein = protein > 0 ? totalNutrients.protein / (protein * mul) : Number.MAX_VALUE;
        const amountByFat = fat > 0 ? totalNutrients.fat / (fat * mul) : Number.MAX_VALUE;
        const amountByCarbo = carbo > 0 ? totalNutrients.carbo / (carbo * mul) : Number.MAX_VALUE;

        let amount = Math.min(  amountByProtein, amountByFat, amountByCarbo,
                                description.max ? description.max : Number.MAX_VALUE,
                                maxAmount ? maxAmount : Number.MAX_VALUE);

        if (DietUtils.isConsumableCountable(consumable)) {

            if (consumable !== FoodConsumable.Unit) {
                amount = Math.floor(amount * 2) * .5;
            } else {
                amount = Math.floor(amount);
            }

            if (amount < Config.minPieceValue) {
                logDiet('- Food:', LocId[locId], `not enough ${amount} (min ${Config.minPieceValue} piece)`);
                return undefined;
            }
        } else {
            amount = Math.round(amount * .1) * 10;
        }

        if (amount === 0) {
            logDiet('- Food:', LocId[locId], `not enough ${amount}`);
            return undefined;
        }

        if (description.min) {
            if (amount < description.min) {
                logDiet('- Food:', LocId[locId], `not enough ${amount} (min value ${description.min})`);
                return undefined;
            }
        }

        const mealNutrients: Nutrients = {
            protein: Math.round(amount * description.protein * mul),
            fat: Math.round(amount * description.fat * mul),
            carbo: Math.round(amount * description.carbo * mul)
        };

        logDiet('* Food:', LocId[locId], 'x' + amount, mealNutrients, mealNutrients.protein * 4 + mealNutrients.fat * 9 + mealNutrients.carbo * 4);

        totalNutrients.protein -= mealNutrients.protein;
        totalNutrients.fat -= mealNutrients.fat;
        totalNutrients.carbo -= mealNutrients.carbo;

        return { locId, amount, consumable };
    }

    public setTarget(target: DietTarget): void {
        this._content.target = target;
    }

    public setMealsAmount(days: DietMealsAmount): void {
      this._content.meals = days;
    }

    public setExcludes(excludes: FoodType[]): void {
      this._content.excludes = excludes;
    }

    public setFormation(formation: Formation): void {
      this._content.formation = formation;
    }

    private getAvailableFoodTypes(excludes: FoodType[], target: DietTarget): FoodType[] {
        let result = [FoodType.Meat, FoodType.Poultry, FoodType.Fish,
        FoodType.Seafood, FoodType.Eggs, FoodType.Milk,
        FoodType.Fruits, FoodType.Expensive, FoodType.SportNutrition];

        result = result.filter(value => !excludes.includes(value));

        if (!result.includes(FoodType.Meat) && !result.includes(FoodType.Poultry) && !result.includes(FoodType.Fish) &&
            !result.includes(FoodType.Seafood) && !result.includes(FoodType.Eggs) && !result.includes(FoodType.Milk)) {
            result.push(FoodType.Vegan);
        }

        if (target === DietTarget.Loss) {
            result.push(FoodType.Loss);
        } else if (target === DietTarget.Support) {
            result.push(FoodType.GainSupport);
        } else {
            result.push(FoodType.GainSupport);
            result.push(FoodType.Gain);
        }

        return result;
    }

    private getWeightIndex(weight: number, height: number, bodyType: BodyType, age: number): number {
        let index = Math.round(weight / (height * height * 0.0001));

        if (bodyType === BodyType.Large || age > Config.ageAfterWeightIndexLoss) {
            index -= Config.largeOldIndexWeightLoss;
        } else if (bodyType === BodyType.Muscular) {
            index -= Config.muscularIndexWeightLoss;
        }
        logDiet('Weight index:', index);
        return index;
    }

    private getFatPercent(indexWeight: number, gender: Gender): number {
        const K = ((0.05 * indexWeight) / (1.3 + 0.021 * indexWeight));

        let result = Math.round(indexWeight * K + 4);

        if (gender === Gender.Female) {
            result += Config.femaleFatPercentBonus;
        }
        logDiet('Fat %:', result);
        return result;
    }

    private getTotalCalories(weight: number, fatPercent: number, activity: Activity, target: DietTarget): number {
        let result = 370 + (21.6 * weight * (100 - fatPercent)) / 100;

        switch (activity) {
            case Activity.Easy:
                result *= 1.4;
                break;
            case Activity.Average:
                result *= 1.6;
                break;
            case Activity.Heavy:
                result *= 1.8;
                break;
            default:
                result *= 1.2;
                break;
        }

        if (target === DietTarget.Loss) {
            result *= 0.7;
        } else if (target === DietTarget.Gain) {
            result *= 1.2;
        }

        return Math.round(result / 100) * 100;
    }

    private getFoodDescription(food: Food, availableTypes: FoodType[]): FoodDescription | undefined {
        const description = FOOD[food];

        for (let i in description.type) {
            if (!availableTypes.includes(description.type[i])) {
                logDiet('--- Filter', Food[food], `rejected (not ${FoodType[description.type[i]]})`);
                return undefined;
            }
        }
        logDiet('+++ Filter', Food[food], 'accepted.');
        return description;
    }

    private getAvailableFood(types: Food[], availableTypes: FoodType[], formation?: Formation): FoodDescription[] {
        const result: FoodDescription[] = [];
        types.forEach(type => {
            const description = this.getFoodDescription(type, availableTypes);
            if (description) {
                result.push(description);
            }
        });
        if (result.length > 0 && isSomething(formation) && formation === Formation.Monotony) {
            return [
              this.getRandomFoodDescription(result)!
            ];
        }
        return result;
    }

    private getRandomFoodDescription(list: FoodDescription[], removeAfter:boolean = false): FoodDescription | undefined {
        if (list.length === 0) {
            return undefined;
        }

        const index = Math.floor(Math.random() * list.length);
        const result = list[index];

        if (removeAfter) {
            list.splice(index, 1);
        }

        return result;
    }
}
