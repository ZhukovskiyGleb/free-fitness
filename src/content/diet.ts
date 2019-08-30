import {Food, FoodType} from "./food";
import {isSomething} from "../utils/utils";
import {DietTarget, Formation} from "../configs/diet-config";
import {Activity, BodyType, Gender} from "../user/user";
import {Config} from "../configs/config";

interface Content {
    target?: DietTarget,
    days?: number,
    excludes?: FoodType[],
    formation?: Formation,
    diet?: DietMeal[]
}

export interface DietMeal {
    [key: number]: {food: Food, amount: number}[]
}

export class Diet {
    private readonly _content: Content = {};

    public getDiet(): string | undefined {
        if (this._content.diet || this.calculateDiet()) {
            const diet = this._content.diet;

            return ''
        }

        return undefined;
    }

    public calculateDiet(): boolean {
        const {target, days, formation, excludes} = this._content;
        if (isSomething(target) && isSomething(days) && isSomething(formation) && isSomething(excludes)) {
            const types = this.getAvailableFoodTypes(excludes, target);

            return true;
        }
        return false;
    }

    public setTarget(target: DietTarget): void {
        this._content.target = target;
    }

    public setDays(days: number): void {
      this._content.days = days;
    }

    public setExcludes(excludes: FoodType[]): void {
      this._content.excludes = excludes;
    }

    public setFormation(formation: Formation): void {
      this._content.formation = formation;
    }

    private getAvailableFoodTypes(excludes: FoodType[], target: DietTarget): FoodType[] {
        const result = [FoodType.Meat, FoodType.Poultry, FoodType.Fish,
        FoodType.Seafood, FoodType.Eggs, FoodType.Milk,
        FoodType.Fruits, FoodType.Expensive, FoodType.SportNutrition];

        result.filter(value => !excludes.includes(value));

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

        return index;
    }

    private getFatPercent(indexWeight: number, gender: Gender): number {
        const K = ((0.05 * indexWeight) / (1.3 + 0.021 * indexWeight));

        let result = Math.round(indexWeight * K);

        if (gender === Gender.Female) {
            result += Config.femaleFatPercentBonus;
        }

        return result;
    }

    private getDailyCalorie(weight: number, fatPercent: number, activity: Activity, target: DietTarget): number {
        let result = 370 + 21.6 * weight * (100 - fatPercent) / 100;

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
            result *= 0.8;
        } else if (target === DietTarget.Gain) {
            result *= 1.8;
        }

        return result;
    }
}