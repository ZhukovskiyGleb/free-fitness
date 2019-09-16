import {LocId} from "../../localization/localization";

export const enum Food {
    Salmon,
    WhiteFish,
    Seafood,
    LeanBeef,
    LeanPork,
    PoultryLeg,
    PoultryFillet,
    Egg,
    EggWhite,
    Soybean,
    Cheese,
    SkimCheese,
    Protein,

    MassPorridge,
    BrownRice,
    Couscous,
    Buckwheat,
    Oatmeal,
    BreadRolls,
    Beans,
    Salad,

    Berries,
    DriedFruits,
    Honey,
    Apple,
    Banana,
    Grapefruit,
    Kiwi,

    Nuts,
    FishOil,
    Oil,
    Avocado
}

export const enum FoodType {
  Meat,
  Poultry,
  Fish,
  Seafood,
  Eggs,
  Milk,
  Fruits,
  Expensive,
  SportNutrition,

  Loss,
  GainSupport,
  Gain,
  Vegan,
}

export const enum FoodConsumable {
    Piece,
    Unit,
    Portion,
    Weight,
    NoWeight,
    TeaSpoon
}

export interface FoodDescription {consumable: FoodConsumable, type: FoodType[], protein: number, fat: number, carbo: number, calories: number, locId: LocId, min?: number, max?: number, oneUse?:boolean}

export const FOOD: {[key in Food]: FoodDescription} = {
    [Food.Salmon]: {consumable: FoodConsumable.Weight, type: [FoodType.Fish, FoodType.Expensive], protein: 20, fat: 13, carbo: 0, calories: 208, locId: LocId.FoodSalmon, min: 100, max: 300, oneUse: true},
    [Food.WhiteFish]: {consumable: FoodConsumable.Weight, type: [FoodType.Fish], protein: 22, fat: 0, carbo: 0, calories: 111, locId: LocId.FoodWhiteFish, min: 100, max: 300},
    [Food.Seafood]: {consumable: FoodConsumable.Weight, type: [FoodType.Seafood], protein: 18, fat: 7, carbo: 0, calories: 175, locId: LocId.FoodSeafood, min: 100, max: 300},

    [Food.LeanBeef]: {consumable: FoodConsumable.Weight, type: [FoodType.Meat], protein: 20, fat: 7, carbo: 0, calories: 158, locId: LocId.FoodLeanBeef, min: 100, max: 300},
    [Food.LeanPork]: {consumable: FoodConsumable.Weight, type: [FoodType.Meat, FoodType.Gain], protein: 20, fat: 9, carbo: 0, calories: 164, locId: LocId.FoodLeanPork, min: 100, max: 300},

    [Food.PoultryLeg]: {consumable: FoodConsumable.Weight, type: [FoodType.Poultry, FoodType.Gain], protein: 18, fat: 13, carbo: 0, calories: 198, locId: LocId.FoodPoultryLeg, min: 150, max: 450},
    [Food.PoultryFillet]: {consumable: FoodConsumable.Weight, type: [FoodType.Poultry], protein: 20, fat: 0, carbo: 0, calories: 112, locId: LocId.FoodPoultryFillet, min: 100, max: 300},

    [Food.Egg]: {consumable: FoodConsumable.Unit, type: [FoodType.Eggs], protein: 6, fat: 5, carbo: 0, calories: 75, locId: LocId.FoodEgg, max: 4, oneUse: true},
    [Food.EggWhite]: {consumable: FoodConsumable.Unit, type: [FoodType.Eggs], protein: 5, fat: 0, carbo: 0, calories: 25, locId: LocId.FoodEggWhite, max: 5, oneUse: true},

    [Food.Soybean]: {consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 36, fat: 20, carbo: 0, calories: 446, locId: LocId.FoodSoybean},

    [Food.Cheese]: {consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.GainSupport], protein: 20, fat: 5, carbo: 0, calories: 145, locId: LocId.FoodCheese, min: 100, max: 300, oneUse: true},
    [Food.SkimCheese]: {consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.Loss], protein: 20, fat: 0, carbo: 0, calories: 110, locId: LocId.FoodSkimCheese, min: 100, max: 300, oneUse: true},

    [Food.Protein]: {consumable: FoodConsumable.Portion, type: [FoodType.SportNutrition], protein: 20, fat: 0, carbo: 0, calories: 88, locId: LocId.FoodProtein, min: 1, max: 2, oneUse: true},

    [Food.MassPorridge]: {consumable: FoodConsumable.Weight, type: [FoodType.GainSupport], protein: 0, fat: 0, carbo: 78, calories: 344, locId: LocId.FoodMassPorridge, min: 40, max: 300},
    [Food.BrownRice]: {consumable: FoodConsumable.Weight, type: [FoodType.Expensive], protein: 0, fat: 0, carbo: 72, calories: 343, locId: LocId.FoodBrownRice, min: 40, max: 250},
    [Food.Couscous]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 72, calories: 376, locId: LocId.FoodBrownRice, min: 40, max: 250},
    [Food.Buckwheat]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 64, calories: 343, locId: LocId.FoodBuckwheat, min: 40, max: 250},

    [Food.Oatmeal]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 62, calories: 352, locId: LocId.FoodOatmeal, min: 20, max: 200},
    [Food.BreadRolls]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 80, calories: 352, locId: LocId.FoodBreadRolls, min: 20, max: 100, oneUse: true},

    [Food.Beans]: {consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 0, fat: 0, carbo: 64, calories: 347, locId: LocId.FoodBeans},
    [Food.Salad]: {consumable: FoodConsumable.NoWeight, type: [], protein: 0, fat: 0, carbo: 5, calories: 347, locId: LocId.FoodSalad, max: 100},

    [Food.Berries]: {consumable: FoodConsumable.Weight, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 16, calories: 57, locId: LocId.FoodBerries, min: 30},
    [Food.DriedFruits]: {consumable: FoodConsumable.Weight, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 83, calories: 359, locId: LocId.FoodBerries, min: 40},
    [Food.Honey]: {consumable: FoodConsumable.TeaSpoon, type: [FoodType.GainSupport], protein: 0, fat: 0, carbo: 6, calories: 23, locId: LocId.FoodHoney, max: 3},

    [Food.Apple]: {consumable: FoodConsumable.Piece, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 10, calories: 60, locId: LocId.FoodApple, max: 2},
    [Food.Banana]: {consumable: FoodConsumable.Piece, type: [FoodType.Fruits, FoodType.GainSupport], protein: 0, fat: 0, carbo: 25, calories: 105, locId: LocId.FoodBanana, max: 2, oneUse: true},
    [Food.Grapefruit]: {consumable: FoodConsumable.Piece, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 20, calories: 105, locId: LocId.FoodGrapefruit, max: 1, oneUse: true},
    [Food.Kiwi]: {consumable: FoodConsumable.Unit, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 11, calories: 46, locId: LocId.FoodKiwi, max: 2},

    [Food.Nuts]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 50, carbo: 0, calories: 610, locId: LocId.FoodNuts, min: 20},
    [Food.FishOil]: {consumable: FoodConsumable.Unit, type: [FoodType.SportNutrition], protein: 0, fat: 2, carbo: 0, calories: 18, locId: LocId.FoodFishOil, max: 3},
    [Food.Oil]: {consumable: FoodConsumable.TeaSpoon, type: [], protein: 0, fat: 5, carbo: 0, calories: 40, locId: LocId.FoodOil, min: 1, max: 10},
    [Food.Avocado]: {consumable: FoodConsumable.Piece, type: [FoodType.Fish, FoodType.Expensive], protein: 0, fat: 30, carbo: 0, calories: 160, locId: LocId.FoodAvocado, max: 1, oneUse: true},
};