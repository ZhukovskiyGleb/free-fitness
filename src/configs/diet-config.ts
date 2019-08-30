export enum DietTarget {
    Loss,
    Support,
    Gain
}

export enum Formation {
    Variety,
    Monotony
}

export enum DietDaysAmount {
    Three,
    Four,
    Five,
    Six
}

enum MealName {
    Breakfast,
    Brunch,
    Lunch,
    HighTea,
    Dinner,
    LateDinner
}

type Nutrients = {protein: number, fat: number, carbo: number};
type MealConfig = {[key in MealName]?: Nutrients}
type DaysConfig = {[key in DietDaysAmount]: MealConfig}
type RequirementConfig = {[key in DietTarget]: Nutrients}

export class DietConfig {
    private static readonly DAILY_REQUIREMENTS: RequirementConfig = {
        [DietTarget.Loss]: {protein: 30, fat: 30, carbo: 40},
        [DietTarget.Support]: {protein: 35, fat: 40, carbo: 35},
        [DietTarget.Gain]: {protein: 25, fat: 25, carbo: 50},
    };

    private static readonly DAYS_SCHEDULE: DaysConfig = {
        [DietDaysAmount.Three]: {
            [MealName.Breakfast]: {protein: 30, fat: 40, carbo: 30},
            [MealName.Lunch]: {protein: 30, fat: 30, carbo: 40},
            [MealName.Dinner]: {protein: 40, fat: 30, carbo: 30},
        },
        [DietDaysAmount.Four]: {
            [MealName.Breakfast]: {protein: 20, fat: 40, carbo: 0},
            [MealName.Brunch]: {protein: 20, fat: 0, carbo: 30},
            [MealName.Lunch]: {protein: 20, fat: 30, carbo: 40},
            [MealName.Dinner]: {protein: 40, fat: 30, carbo: 30},
        },
        [DietDaysAmount.Five]: {
            [MealName.Breakfast]: {protein: 15, fat: 40, carbo: 0},
            [MealName.Brunch]: {protein: 15, fat: 0, carbo: 30},
            [MealName.Lunch]: {protein: 20, fat: 30, carbo: 30},
            [MealName.HighTea]: {protein: 20, fat: 0, carbo: 20},
            [MealName.Dinner]: {protein: 30, fat: 30, carbo: 20},
        },
        [DietDaysAmount.Six]: {
            [MealName.Breakfast]: {protein: 15, fat: 40, carbo: 0},
            [MealName.Brunch]: {protein: 15, fat: 0, carbo: 30},
            [MealName.Lunch]: {protein: 20, fat: 30, carbo: 30},
            [MealName.HighTea]: {protein: 15, fat: 0, carbo: 20},
            [MealName.Dinner]: {protein: 20, fat: 15, carbo: 20},
            [MealName.LateDinner]: {protein: 15, fat: 15, carbo: 20},
        }
    }

    public gatDaySchedule(days: DietDaysAmount): MealConfig {
        return DietConfig.DAYS_SCHEDULE[days];
    }

    public getDailyRequirements(target: DietTarget): Nutrients {
        return DietConfig.DAILY_REQUIREMENTS[target];
    }
}