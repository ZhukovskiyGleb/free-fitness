import {FOOD, Food, FoodConsumable, FoodDescription, FoodType} from "./food";
import {isSomething, log} from "../utils/utils";
import {DietUtils, DietMealsAmount, DietTarget, Formation, MealName, Nutrients} from "./diet-utils";
import {Activity, BodyType, Gender, User} from "../user/user";
import {Config} from "../configs/config";
import {Localization, LocId} from "../localization/localization";

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
    proteinSnack: FoodDescription[],
    dayCarbo: FoodDescription[],
    lowCarbo: FoodDescription[],
    fastCarbo: FoodDescription[],
    mainFats: FoodDescription[],
    addFats: FoodDescription[],
    morningCarbo: FoodDescription[],
}

interface MealOptions {
    isSnack: boolean,
    isFastCarboAvailable: boolean,
    isMorning: boolean,
    maxMorningCarbo: number,
    maxDayCarbo: number
}

export class Diet {
    private readonly _content: Content = {};

    public getDiet(user: User, lang: string): string | undefined {
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

    private getMeal(name: MealName, lang: string): string {
        let result = Localization.loc(lang, DietUtils.getMealLocId(name)) + ':';
        if (this._content.diet && this._content.diet[name]) {
            const meal = this._content.diet[name]!;
            meal.forEach(food => {
                const consumable = Localization.loc(lang, DietUtils.getConsumableLocId(food.consumable));
                result += '\n- ' + Localization.loc(lang, food.locId) + ' ' + food.amount + ` ${consumable};`;
            });

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

        log('Available food types:', types);

        const list: FoodList = {
            complexProtein: this.getAvailableFood([Food.Salmon, Food.Seafood, Food.LeanBeef, Food.PoultryThigh, Food.Soybean], types, formation),
            isolateProtein: this.getAvailableFood([Food.WhiteFish, Food.PoultryFillet, Food.EggWhite, Food.SkimCheese, Food.Soybean], types, formation),
            proteinSnack: this.getAvailableFood([Food.Protein, Food.EggWhite, Food.SkimCheese, Food.Soybean], types),
            dayCarbo: this.getAvailableFood([Food.MassPorridge, Food.BrownRice, Food.Buckwheat, Food.Beans], types, formation),
            lowCarbo: this.getAvailableFood([Food.Broccoli], types),
            fastCarbo: this.getAvailableFood([Food.Berries, Food.Banana, Food.Apple], types),
            mainFats: this.getAvailableFood([Food.Nuts, Food.Oil, Food.Avocado], types),
            addFats: this.getAvailableFood([Food.FishOil, Food.Oil], types),
            morningCarbo: this.getAvailableFood([Food.Oatmeal], types, formation),
        };

        const egg =  this.getFoodDescription(Food.Egg, types);
        const cheese =  this.getFoodDescription(Food.Cheese, types);
        const protein =  this.getFoodDescription(Food.Protein, types);
        if (list.complexProtein.length === 0) {
            egg && list.isolateProtein.push(egg);
            cheese && list.isolateProtein.push(cheese);
        }
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
        log('Total calories:', totalCalories);

        const targetSchedule = DietUtils.getDailyRequirements(target);

        const dailyRequirements: Nutrients = {
            protein: Math.round(totalCalories * targetSchedule.protein * 0.01 / Config.proteinCalories),
            fat: Math.round(totalCalories * targetSchedule.fat * 0.01 / Config.fatCalories),
            carbo: Math.round(totalCalories * targetSchedule.carbo * 0.01 / Config.carboCalories)
        };
        log('Daily requirements', dailyRequirements);

        const dailySchedule = DietUtils.getDaySchedule(meals);

        const diet: DietMealConfig = {};

        dailySchedule.forEach(config => {
            log('------------', config.name, '------------');
            const mealRequirements: Nutrients = {
                protein: Math.round(dailyRequirements.protein * config.nutrients.protein * 0.01),
                fat: Math.round(dailyRequirements.fat * config.nutrients.fat * 0.01),
                carbo: Math.round(dailyRequirements.carbo * config.nutrients.carbo * 0.01),
            };
            log('Meal requirements', mealRequirements);

            const options: MealOptions = {
                isSnack: DietUtils.isSnackMeal(config.name),
                isFastCarboAvailable: DietUtils.isFastCarboAvailable(target, config.name),
                isMorning: config.name === MealName.Breakfast || config.name === MealName.Brunch,
                maxMorningCarbo: weight * Config.maxMorningCarboMul,
                maxDayCarbo: weight * Config.maxDayCarboMul
            };

            diet[config.name] = this.calculateDay(
                mealRequirements,
                list,
                options
            );
        });

        this._content.diet = diet;

        return true;
    }

    private calculateDay(nutrients: Nutrients, list: FoodList, options: MealOptions): DietMeal[] {
        const result: DietMeal[] = [];

        if (nutrients.protein > 0) {
            if (!options.isSnack) {
                if (nutrients.fat > 0) {//complex protein
                    log('Complex protein');
                    this.addFoodToList(result,
                        this.calculateFood(nutrients, this.getRandomFoodDescription(list.complexProtein))
                    )
                } else {//isolate protein
                    log('Isolate protein');
                    this.addFoodToList(result,
                         this.calculateFood(nutrients, this.getRandomFoodDescription(list.isolateProtein))
                    )
                }
            }
            if (nutrients.protein > 0) {//snack protein
                log('Snack protein');
                this.addFoodToList(result,
                    this.calculateFood(nutrients, this.getRandomFoodDescription(list.proteinSnack))
                )
            }
        }
        if (nutrients.fat > Config.minFatPortion) {// main fat
            log('Main fats');
            this.addFoodToList(result,
                this.calculateFood(nutrients, this.getRandomFoodDescription(list.mainFats))
            )
        } else if (nutrients.fat > 0) {// add fat
            log('Add fats');
            this.addFoodToList(result,
                this.calculateFood(nutrients, this.getRandomFoodDescription(list.addFats))
            )
        }
        if (options.isSnack && options.isFastCarboAvailable && nutrients.carbo >= Config.minSnackCarboPortion) {// 20g fast carbo
            log('Snack carbo potion');
            this.addFoodToList(result,
                this.calculateFood(nutrients, this.getRandomFoodDescription(list.fastCarbo), Config.minSnackCarboPortion)
            )
        }
        if (nutrients.carbo > 0) {
            if (options.isMorning) {// morning carbo (max morning carbo)
                log('Morninig carbo');
                this.addFoodToList(result,
                    this.calculateFood(nutrients, this.getRandomFoodDescription(list.morningCarbo), options.maxMorningCarbo)
                )
            } else {// main carbo (max day carbo)
                log('Daily carbo');
                this.addFoodToList(result,
                    this.calculateFood(nutrients, this.getRandomFoodDescription(list.dayCarbo), options.maxDayCarbo)
                )
            }
            if (nutrients.carbo > 0) {
                if (options.isFastCarboAvailable) {//fast carbo
                    log('Fast carbo');
                    this.addFoodToList(result,
                         this.calculateFood(nutrients, this.getRandomFoodDescription(list.fastCarbo))
                    )
                } else {//low carbo
                    log('Low carbo');
                    this.addFoodToList(result,
                      this.calculateFood(nutrients, this.getRandomFoodDescription(list.lowCarbo))
                    )
                }
            }
        }

        return result;
    }

    private addFoodToList(list: DietMeal[], meal?: DietMeal): void {
        if (meal) {
            list.push(meal);
        }
    }

    private calculateFood(nutrients: Nutrients, description: FoodDescription, maxAmount?: number): DietMeal | undefined {
        const { protein, fat, carbo, consumable, locId } = description;

        const amountByProtein = protein > 0 ? nutrients.protein / (protein * 0.01) : Number.MAX_VALUE;
        const amountByFat = fat > 0 ? nutrients.fat / (fat * 0.01) : Number.MAX_VALUE;
        const amountByCarbo = carbo > 0 ? nutrients.carbo / (carbo * 0.01) : Number.MAX_VALUE;

        let amount = Math.min(amountByProtein, amountByFat, amountByCarbo, maxAmount ? maxAmount : Number.MAX_VALUE);

        if (consumable !== FoodConsumable.Weight) {
            log('Consumable amount', amount);
            if (consumable !== FoodConsumable.Unit) {
                amount = Math.floor(amount * 2) * .5;
            } else {
                amount = Math.floor(amount);
            }

            if (amount < Config.minPieceValue) {
                log('Food:', LocId[locId], 'not enough');
                return undefined;
            }

            nutrients.protein -= amount * description.protein;
            nutrients.fat -= amount * description.fat;
            nutrients.carbo -= amount * description.carbo;
        } else {
            amount = Math.round(amount * .1) * 10;

            nutrients.protein -= amount * description.protein * .01;
            nutrients.fat -= amount * description.fat * .01;
            nutrients.carbo -= amount * description.carbo * .01;
        }
        amount = Math.round(amount);
        log('Food:', LocId[locId], 'amount:', amount);

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
        log('Weight index:', index);
        return index;
    }

    private getFatPercent(indexWeight: number, gender: Gender): number {
        const K = ((0.05 * indexWeight) / (1.3 + 0.021 * indexWeight));

        let result = Math.round(indexWeight * K + 4);

        if (gender === Gender.Female) {
            result += Config.femaleFatPercentBonus;
        }
        log('Fat %:', result);
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
                return undefined;
            }
        }

        return description;
    }

    private getAvailableFood(types: Food[], availableTypes: FoodType[], formation?: Formation): FoodDescription[] {
        const result: FoodDescription[] = [];
        types.forEach(type => {
            const description = this.getFoodDescription(type, availableTypes);
            if (description) {
                log('+++ Food', Food[type], 'accepted.');
                result.push(description);
            } else {
                log('--- Food', Food[type], 'rejected.');
            }
        });
        if (isSomething(formation) && formation === Formation.Monotony) {
            return [
              this.getRandomFoodDescription(result)
            ];
        }
        return result;
    }

    private getRandomFoodDescription(list: FoodDescription[]): FoodDescription {
        return list[Math.floor(Math.random() * list.length)];
    }
}
