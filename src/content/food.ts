import {LocId} from "../localization/localization";

export enum Food {
    Salmon,
    WhiteFish,
    Seafood,
    LeanBeef,
    LeanPork,
    PoultryThigh,
    PoultryFillet,
    Egg,
    EggWhite,
    Soybean,
    Cheese,
    SkimCheese,
    Protein,

    MassPorridge,
    BrownRice,
    Buckwheat,
    Oatmeal,
    Beans,
    Berries,
    Apple,
    Banana,

    Nuts,
    FishOil,
    Oil,
    Avocado
}

export enum FoodType {
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

export enum FoodConsumable {
    Piece,
    Weight
}

export interface FoodDescription {consumable: FoodConsumable, type: FoodType[], protein: number, fat: number, carbo: number, calories: number, locId: LocId};

export const FOOD: {[key in Food]: FoodDescription} = {
    [Food.Salmon]: {consumable: FoodConsumable.Weight, type: [FoodType.Fish, FoodType.Expensive], protein: 20, fat: 13, carbo: 0, calories: 208, locId: LocId.FoodSalmon},
    [Food.WhiteFish]: {consumable: FoodConsumable.Weight, type: [FoodType.Fish], protein: 22, fat: 0, carbo: 0, calories: 111, locId: LocId.FoodWhiteFish},
    [Food.Seafood]: {consumable: FoodConsumable.Weight, type: [FoodType.Seafood], protein: 18, fat: 7, carbo: 0, calories: 175, locId: LocId.FoodSeafood},

    [Food.LeanBeef]: {consumable: FoodConsumable.Weight, type: [FoodType.Meat], protein: 20, fat: 7, carbo: 0, calories: 158, locId: LocId.FoodLeanBeef},
    [Food.LeanPork]: {consumable: FoodConsumable.Weight, type: [FoodType.Meat, FoodType.Gain], protein: 20, fat: 9, carbo: 0, calories: 164, locId: LocId.FoodLeanPork},

    [Food.PoultryThigh]: {consumable: FoodConsumable.Weight, type: [FoodType.Poultry, FoodType.Gain], protein: 17, fat: 9, carbo: 0, calories: 175, locId: LocId.FoodPoultryThigh},
    [Food.PoultryFillet]: {consumable: FoodConsumable.Weight, type: [FoodType.Poultry], protein: 20, fat: 0, carbo: 0, calories: 112, locId: LocId.FoodPoultryFillet},

    [Food.Egg]: {consumable: FoodConsumable.Piece, type: [FoodType.Eggs], protein: 6, fat: 5, carbo: 0, calories: 75, locId: LocId.FoodEgg},
    [Food.EggWhite]: {consumable: FoodConsumable.Piece, type: [FoodType.Eggs], protein: 5, fat: 0, carbo: 0, calories: 25, locId: LocId.FoodEggWhite},

    [Food.Soybean]: {consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 36, fat: 20, carbo: 30, calories: 446, locId: LocId.FoodSoybean},

    [Food.Cheese]: {consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.GainSupport], protein: 20, fat: 5, carbo: 0, calories: 145, locId: LocId.FoodCheese},
    [Food.SkimCheese]: {consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.Loss], protein: 20, fat: 0, carbo: 0, calories: 110, locId: LocId.FoodSkimCheese},

    [Food.Protein]: {consumable: FoodConsumable.Piece, type: [FoodType.SportNutrition], protein: 20, fat: 0, carbo: 0, calories: 88, locId: LocId.FoodProtein},

    [Food.MassPorridge]: {consumable: FoodConsumable.Weight, type: [FoodType.GainSupport], protein: 0, fat: 0, carbo: 78, calories: 344, locId: LocId.FoodMassPorridge},
    [Food.BrownRice]: {consumable: FoodConsumable.Weight, type: [FoodType.Expensive], protein: 0, fat: 0, carbo: 72, calories: 343, locId: LocId.FoodBrownRice},
    [Food.Buckwheat]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 64, calories: 343, locId: LocId.FoodBuckwheat},
    [Food.Oatmeal]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 62, calories: 352, locId: LocId.FoodOatmeal},

    [Food.Beans]: {consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 20, fat: 0, carbo: 64, calories: 347, locId: LocId.FoodBeans},

    [Food.Berries]: {consumable: FoodConsumable.Weight, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 16, calories: 57, locId: LocId.FoodBerries},
    [Food.Apple]: {consumable: FoodConsumable.Piece, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 10, calories: 60, locId: LocId.FoodApple},
    [Food.Banana]: {consumable: FoodConsumable.Piece, type: [FoodType.Fruits, FoodType.GainSupport], protein: 0, fat: 0, carbo: 20, calories: 100, locId: LocId.FoodBanana},

    [Food.Nuts]: {consumable: FoodConsumable.Weight, type: [], protein: 20, fat: 50, carbo: 20, calories: 610, locId: LocId.FoodNuts},
    [Food.FishOil]: {consumable: FoodConsumable.Weight, type: [FoodType.SportNutrition], protein: 0, fat: 2, carbo: 0, calories: 18, locId: LocId.FoodFishOil},
    [Food.Oil]: {consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 100, carbo: 0, calories: 884, locId: LocId.FoodOil},
    [Food.Avocado]: {consumable: FoodConsumable.Piece, type: [FoodType.Fish, FoodType.Expensive], protein: 0, fat: 30, carbo: 20, calories: 160, locId: LocId.FoodAvocado},
};