import {DietMealsAmount, DietTarget, Formation} from "../../content/diet-utils";
import {Checkbox} from "../../utils/keyboard-maker";
import {FoodType} from "../../content/food";

export class DietScenarioUtils {
    public static readonly LOSS_CALLBACK = 'NEW_DIET_LOSS_CALLBACK';
    public static readonly SUPPORT_CALLBACK = 'NEW_DIET_SUPPORT_CALLBACK';
    public static readonly GAIN_CALLBACK = 'NEW_DIET_GAIN_CALLBACK';
    public static readonly FORMATION_VARIETY_CALLBACK = 'NEW_DIET_FORMATION_VARIETY_CALLBACK';
    public static readonly FORMATION_MONOTONY_CALLBACK = 'NEW_DIET_FORMATION_MONOTONY_CALLBACK';
    public static readonly RESULT_SAVE_CALLBACK = 'NEW_DIET_RESULT_SAVE_CALLBACK';
    public static readonly BACK_CALLBACK = 'NEW_DIET_BACK_CALLBACK';

    public static readonly MEAL_AMOUNT_3 = 'NEW_DIET_MEAL_AMOUNT_3_CALLBACK';
    public static readonly MEAL_AMOUNT_4 = 'NEW_DIET_MEAL_AMOUNT_4_CALLBACK';
    public static readonly MEAL_AMOUNT_5 = 'NEW_DIET_MEAL_AMOUNT_5_CALLBACK';
    public static readonly MEAL_AMOUNT_6 = 'NEW_DIET_MEAL_AMOUNT_6_CALLBACK';

    public static readonly FOOD_MEAT = 'NEW_DIET_FOOD_MEAT_CALLBACK';
    public static readonly FOOD_POULTRY = 'NEW_DIET_FOOD_POULTRY_CALLBACK';
    public static readonly FOOD_FISH = 'NEW_DIET_FOOD_FISH_CALLBACK';
    public static readonly FOOD_SEAFOOD = 'NEW_DIET_FOOD_SEAFOOD_CALLBACK';
    public static readonly FOOD_EGGS = 'NEW_DIET_FOOD_EGGS_CALLBACK';
    public static readonly FOOD_MILK = 'NEW_DIET_FOOD_MILK_CALLBACK';
    public static readonly FOOD_FRUITS = 'NEW_DIET_FOOD_FRUITS_CALLBACK';
    public static readonly FOOD_EXPENSIVE = 'NEW_DIET_FOOD_EXPENSIVE_CALLBACK';
    public static readonly FOOD_SPORT_NUTRITION = 'NEW_DIET_FOOD_SPORT_NUTRITION_CALLBACK';

    public static readonly CONTINUE = 'NEW_DIET_CONTINUE_CALLBACK';

    private static readonly CALLBACK_TO_TARGET: {[key: string]: DietTarget} = {
        [DietScenarioUtils.LOSS_CALLBACK]: DietTarget.Loss,
        [DietScenarioUtils.SUPPORT_CALLBACK]: DietTarget.Support,
        [DietScenarioUtils.GAIN_CALLBACK]: DietTarget.Gain,
    };

    private static readonly CALLBACK_TO_MEALS_AMOUNT: {[key: string]: DietMealsAmount} = {
      [DietScenarioUtils.MEAL_AMOUNT_3]: DietMealsAmount.Three,
      [DietScenarioUtils.MEAL_AMOUNT_4]: DietMealsAmount.Four,
      [DietScenarioUtils.MEAL_AMOUNT_5]: DietMealsAmount.Five,
      [DietScenarioUtils.MEAL_AMOUNT_6]: DietMealsAmount.Six,
    };

    private static readonly CALLBACK_TO_FOOD_TYPE: {[key: string]: FoodType} = {
        [DietScenarioUtils.FOOD_MEAT]: FoodType.Meat,
        [DietScenarioUtils.FOOD_POULTRY]: FoodType.Poultry,
        [DietScenarioUtils.FOOD_FISH]: FoodType.Fish,
        [DietScenarioUtils.FOOD_SEAFOOD]: FoodType.Seafood,
        [DietScenarioUtils.FOOD_EGGS]: FoodType.Eggs,
        [DietScenarioUtils.FOOD_MILK]: FoodType.Milk,
        [DietScenarioUtils.FOOD_FRUITS]: FoodType.Fruits,
        [DietScenarioUtils.FOOD_SPORT_NUTRITION]: FoodType.SportNutrition,
        [DietScenarioUtils.FOOD_EXPENSIVE]: FoodType.Expensive,
    };

    private static readonly CALLBACK_TO_FORMATION: {[key: string]: Formation} = {
      [DietScenarioUtils.FORMATION_VARIETY_CALLBACK]: Formation.Variety,
      [DietScenarioUtils.FORMATION_MONOTONY_CALLBACK]: Formation.Monotony,
    };

    public static getTargetByCallback<C extends keyof typeof DietScenarioUtils.CALLBACK_TO_TARGET>(callback: C): DietTarget {
        return DietScenarioUtils.CALLBACK_TO_TARGET[callback];
    }

    public static getMealsAmountByCallback<C extends keyof typeof DietScenarioUtils.CALLBACK_TO_MEALS_AMOUNT>(callback: C): DietMealsAmount {
      return DietScenarioUtils.CALLBACK_TO_MEALS_AMOUNT[callback];
    }

    public static getFormationByCallback<C extends keyof typeof DietScenarioUtils.CALLBACK_TO_FORMATION>(callback: C): Formation {
      return DietScenarioUtils.CALLBACK_TO_FORMATION[callback];
    }

    public static getExcludesByCheckboxes(checkboxes: Checkbox[]): FoodType[] {
        const result: FoodType[] = [];
        checkboxes.forEach(checkbox => {
            if (!checkbox.value) {
                result.push(DietScenarioUtils.CALLBACK_TO_FOOD_TYPE[checkbox.callback]);
            }
        });
        return result;
    }
}