import {LocId} from "../localization/localization";
import {FoodConsumable} from "./food";

export enum DietTarget {
    Loss= 'loss',
    Support = 'support',
    Gain = 'gain'
}

export enum Formation {
    Variety,
    Monotony
}

export enum DietMealsAmount {
    Three= 'three',
    Four = 'four',
    Five = 'five',
    Six = 'six'
}

export enum MealName {
    Breakfast = 'breakfast',
    Brunch = 'brunch',
    Lunch = 'lunch',
    HighTea = 'highTea',
    Dinner = 'dinner',
    LateDinner = 'lateDinner'
}

export interface Nutrients {protein: number, fat: number, carbo: number};

type MealConfig = {name: MealName, nutrients: Nutrients}
type DaysConfig = {[key in DietMealsAmount]: MealConfig[]}
type RequirementConfig = {[key in DietTarget]: Nutrients}

export class DietUtils {
    private static readonly DAILY_REQUIREMENTS: RequirementConfig = {
        [DietTarget.Loss]: {protein: 30, fat: 30, carbo: 40},
        [DietTarget.Support]: {protein: 35, fat: 40, carbo: 35},
        [DietTarget.Gain]: {protein: 25, fat: 25, carbo: 50},
    };

    private static readonly DAYS_SCHEDULE: DaysConfig = {
        [DietMealsAmount.Three]: [
            {name: MealName.Breakfast, nutrients: {protein: 30, fat: 40, carbo: 30}},
            {name: MealName.Lunch, nutrients: {protein: 30, fat: 30, carbo: 40}},
            {name: MealName.Dinner, nutrients: {protein: 40, fat: 30, carbo: 30}},
        ],
        [DietMealsAmount.Four]: [
            {name: MealName.Breakfast, nutrients: {protein: 20, fat: 40, carbo: 0}},
            {name: MealName.Brunch, nutrients: {protein: 20, fat: 0, carbo: 30}},
            {name: MealName.Lunch, nutrients: {protein: 20, fat: 30, carbo: 40}},
            {name: MealName.Dinner, nutrients: {protein: 40, fat: 30, carbo: 30}},
        ],
        [DietMealsAmount.Five]: [
            {name: MealName.Breakfast, nutrients: {protein: 15, fat: 40, carbo: 0}},
            {name: MealName.Brunch, nutrients: {protein: 15, fat: 0, carbo: 30}},
            {name: MealName.Lunch, nutrients: {protein: 20, fat: 30, carbo: 30}},
            {name: MealName.HighTea, nutrients: {protein: 20, fat: 0, carbo: 20}},
            {name: MealName.Dinner, nutrients: {protein: 30, fat: 30, carbo: 20}},
        ],
        [DietMealsAmount.Six]: [
            {name: MealName.Breakfast, nutrients: {protein: 15, fat: 40, carbo: 0}},
            {name: MealName.Brunch, nutrients: {protein: 15, fat: 0, carbo: 30}},
            {name: MealName.Lunch, nutrients: {protein: 20, fat: 30, carbo: 30}},
            {name: MealName.HighTea, nutrients: {protein: 15, fat: 0, carbo: 20}},
            {name: MealName.Dinner, nutrients: {protein: 20, fat: 15, carbo: 20}},
            {name: MealName.LateDinner, nutrients: {protein: 15, fat: 15, carbo: 20}},
        ]
    };

    private static readonly DAYS_AMOUNT: {[key in DietMealsAmount]: number} = {
        [DietMealsAmount.Three]: 3,
        [DietMealsAmount.Four]: 4,
        [DietMealsAmount.Five]: 5,
        [DietMealsAmount.Six]: 6,
    };

    private static readonly MEAL_SNACK: {[key in MealName]: boolean} = {
        [MealName.Breakfast]: false,
        [MealName.Brunch]: true,
        [MealName.Lunch]: false,
        [MealName.HighTea]: true,
        [MealName.Dinner]: false,
        [MealName.LateDinner]: true,
    };

     private static readonly MEAL_TO_FAST_CARBO_AVAILABLE: {[key in DietTarget]: {[key in MealName]: boolean}} = {
        [DietTarget.Loss]: {
            [MealName.Breakfast]: true,
            [MealName.Brunch]: true,
            [MealName.Lunch]: false,
            [MealName.HighTea]: false,
            [MealName.Dinner]: false,
            [MealName.LateDinner]: false,
        },
        [DietTarget.Support]: {
            [MealName.Breakfast]: true,
            [MealName.Brunch]: true,
            [MealName.Lunch]: true,
            [MealName.HighTea]: true,
            [MealName.Dinner]: false,
            [MealName.LateDinner]: false,
        },
        [DietTarget.Gain]: {
            [MealName.Breakfast]: true,
            [MealName.Brunch]: true,
            [MealName.Lunch]: true,
            [MealName.HighTea]: true,
            [MealName.Dinner]: true,
            [MealName.LateDinner]: false,
        }
     };

    private static readonly MEAL_TO_LOC_ID: {[key in MealName]: LocId} = {
        [MealName.Breakfast]: LocId.Breakfast,
        [MealName.Brunch]: LocId.Brunch,
        [MealName.Lunch]: LocId.Lunch,
        [MealName.HighTea]: LocId.HighTea,
        [MealName.Dinner]: LocId.Dinner,
        [MealName.LateDinner]: LocId.LateDinner,
    };

    private static readonly CONSUMABLE_TO_LOC_ID: {[key in FoodConsumable]: LocId} = {
        [FoodConsumable.Weight]: LocId.Grams,
        [FoodConsumable.Piece]: LocId.Piece,
        [FoodConsumable.Unit]: LocId.Piece,
        [FoodConsumable.Portion]: LocId.Portion,
    };

    public static isSnackMeal(meal: MealName): boolean {
       return DietUtils.MEAL_SNACK[meal];
    }

    public static isFastCarboAvailable(target: DietTarget, meal: MealName): boolean {
      return DietUtils.MEAL_TO_FAST_CARBO_AVAILABLE[target][meal];
    }

    public static getDaySchedule(days: DietMealsAmount): MealConfig[] {
        return DietUtils.DAYS_SCHEDULE[days];
    }

    public static getDaysAmount(days: DietMealsAmount): number {
        return DietUtils.DAYS_AMOUNT[days];
    }

    public static getDailyRequirements(target: DietTarget): Nutrients {
        return DietUtils.DAILY_REQUIREMENTS[target];
    }

    public static getMealLocId(meal: MealName): LocId {
        return DietUtils.MEAL_TO_LOC_ID[meal];
    }

    public static getConsumableLocId(consumable: FoodConsumable): LocId {
        return DietUtils.CONSUMABLE_TO_LOC_ID[consumable];
    }

}