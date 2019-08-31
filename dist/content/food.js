"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var localization_1 = require("../localization/localization");
var Food;
(function (Food) {
    Food[Food["Salmon"] = 0] = "Salmon";
    Food[Food["WhiteFish"] = 1] = "WhiteFish";
    Food[Food["Seafood"] = 2] = "Seafood";
    Food[Food["LeanBeef"] = 3] = "LeanBeef";
    Food[Food["LeanPork"] = 4] = "LeanPork";
    Food[Food["PoultryThigh"] = 5] = "PoultryThigh";
    Food[Food["PoultryFillet"] = 6] = "PoultryFillet";
    Food[Food["Egg"] = 7] = "Egg";
    Food[Food["EggWhite"] = 8] = "EggWhite";
    Food[Food["Soybean"] = 9] = "Soybean";
    Food[Food["Cheese"] = 10] = "Cheese";
    Food[Food["SkimCheese"] = 11] = "SkimCheese";
    Food[Food["Protein"] = 12] = "Protein";
    Food[Food["MassPorridge"] = 13] = "MassPorridge";
    Food[Food["BrownRice"] = 14] = "BrownRice";
    Food[Food["Buckwheat"] = 15] = "Buckwheat";
    Food[Food["Oatmeal"] = 16] = "Oatmeal";
    Food[Food["Beans"] = 17] = "Beans";
    Food[Food["Berries"] = 18] = "Berries";
    Food[Food["Apple"] = 19] = "Apple";
    Food[Food["Banana"] = 20] = "Banana";
    Food[Food["Nuts"] = 21] = "Nuts";
    Food[Food["FishOil"] = 22] = "FishOil";
    Food[Food["Oil"] = 23] = "Oil";
    Food[Food["Avocado"] = 24] = "Avocado";
})(Food = exports.Food || (exports.Food = {}));
var FoodType;
(function (FoodType) {
    FoodType[FoodType["Meat"] = 0] = "Meat";
    FoodType[FoodType["Poultry"] = 1] = "Poultry";
    FoodType[FoodType["Fish"] = 2] = "Fish";
    FoodType[FoodType["Seafood"] = 3] = "Seafood";
    FoodType[FoodType["Eggs"] = 4] = "Eggs";
    FoodType[FoodType["Milk"] = 5] = "Milk";
    FoodType[FoodType["Fruits"] = 6] = "Fruits";
    FoodType[FoodType["Expensive"] = 7] = "Expensive";
    FoodType[FoodType["SportNutrition"] = 8] = "SportNutrition";
    FoodType[FoodType["Loss"] = 9] = "Loss";
    FoodType[FoodType["GainSupport"] = 10] = "GainSupport";
    FoodType[FoodType["Gain"] = 11] = "Gain";
    FoodType[FoodType["Vegan"] = 12] = "Vegan";
})(FoodType = exports.FoodType || (exports.FoodType = {}));
var FoodConsumable;
(function (FoodConsumable) {
    FoodConsumable[FoodConsumable["Piece"] = 0] = "Piece";
    FoodConsumable[FoodConsumable["Weight"] = 1] = "Weight";
})(FoodConsumable = exports.FoodConsumable || (exports.FoodConsumable = {}));
;
exports.FOOD = (_a = {},
    _a[Food.Salmon] = { consumable: FoodConsumable.Weight, type: [FoodType.Fish, FoodType.Expensive], protein: 20, fat: 13, carbo: 0, calories: 208, locId: localization_1.LocId.FoodSalmon },
    _a[Food.WhiteFish] = { consumable: FoodConsumable.Weight, type: [FoodType.Fish], protein: 22, fat: 0, carbo: 0, calories: 111, locId: localization_1.LocId.FoodWhiteFish },
    _a[Food.Seafood] = { consumable: FoodConsumable.Weight, type: [FoodType.Seafood], protein: 18, fat: 7, carbo: 0, calories: 175, locId: localization_1.LocId.FoodSeafood },
    _a[Food.LeanBeef] = { consumable: FoodConsumable.Weight, type: [FoodType.Meat], protein: 20, fat: 7, carbo: 0, calories: 158, locId: localization_1.LocId.FoodLeanBeef },
    _a[Food.LeanPork] = { consumable: FoodConsumable.Weight, type: [FoodType.Meat, FoodType.Gain], protein: 20, fat: 9, carbo: 0, calories: 164, locId: localization_1.LocId.FoodLeanPork },
    _a[Food.PoultryThigh] = { consumable: FoodConsumable.Weight, type: [FoodType.Poultry, FoodType.Gain], protein: 17, fat: 9, carbo: 0, calories: 175, locId: localization_1.LocId.FoodPoultryThigh },
    _a[Food.PoultryFillet] = { consumable: FoodConsumable.Weight, type: [FoodType.Poultry], protein: 20, fat: 0, carbo: 0, calories: 112, locId: localization_1.LocId.FoodPoultryFillet },
    _a[Food.Egg] = { consumable: FoodConsumable.Piece, type: [FoodType.Eggs], protein: 6, fat: 5, carbo: 0, calories: 75, locId: localization_1.LocId.FoodEgg },
    _a[Food.EggWhite] = { consumable: FoodConsumable.Piece, type: [FoodType.Eggs], protein: 5, fat: 0, carbo: 0, calories: 25, locId: localization_1.LocId.FoodEggWhite },
    _a[Food.Soybean] = { consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 36, fat: 20, carbo: 30, calories: 446, locId: localization_1.LocId.FoodSoybean },
    _a[Food.Cheese] = { consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.GainSupport], protein: 20, fat: 5, carbo: 0, calories: 145, locId: localization_1.LocId.FoodCheese },
    _a[Food.SkimCheese] = { consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.Loss], protein: 20, fat: 0, carbo: 0, calories: 110, locId: localization_1.LocId.FoodSkimCheese },
    _a[Food.Protein] = { consumable: FoodConsumable.Piece, type: [FoodType.SportNutrition], protein: 20, fat: 0, carbo: 0, calories: 88, locId: localization_1.LocId.FoodProtein },
    _a[Food.MassPorridge] = { consumable: FoodConsumable.Weight, type: [FoodType.GainSupport], protein: 0, fat: 0, carbo: 78, calories: 344, locId: localization_1.LocId.FoodMassPorridge },
    _a[Food.BrownRice] = { consumable: FoodConsumable.Weight, type: [FoodType.Expensive], protein: 0, fat: 0, carbo: 72, calories: 343, locId: localization_1.LocId.FoodBrownRice },
    _a[Food.Buckwheat] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 64, calories: 343, locId: localization_1.LocId.FoodBuckwheat },
    _a[Food.Oatmeal] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 62, calories: 352, locId: localization_1.LocId.FoodOatmeal },
    _a[Food.Beans] = { consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 20, fat: 0, carbo: 64, calories: 347, locId: localization_1.LocId.FoodBeans },
    _a[Food.Berries] = { consumable: FoodConsumable.Weight, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 16, calories: 57, locId: localization_1.LocId.FoodBerries },
    _a[Food.Apple] = { consumable: FoodConsumable.Piece, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 10, calories: 60, locId: localization_1.LocId.FoodApple },
    _a[Food.Banana] = { consumable: FoodConsumable.Piece, type: [FoodType.Fruits, FoodType.GainSupport], protein: 0, fat: 0, carbo: 20, calories: 100, locId: localization_1.LocId.FoodBanana },
    _a[Food.Nuts] = { consumable: FoodConsumable.Weight, type: [], protein: 20, fat: 50, carbo: 20, calories: 610, locId: localization_1.LocId.FoodNuts },
    _a[Food.FishOil] = { consumable: FoodConsumable.Weight, type: [FoodType.SportNutrition], protein: 0, fat: 2, carbo: 0, calories: 18, locId: localization_1.LocId.FoodFishOil },
    _a[Food.Oil] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 100, carbo: 0, calories: 884, locId: localization_1.LocId.FoodOil },
    _a[Food.Avocado] = { consumable: FoodConsumable.Piece, type: [FoodType.Fish, FoodType.Expensive], protein: 0, fat: 30, carbo: 20, calories: 160, locId: localization_1.LocId.FoodAvocado },
    _a);
