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
    Food[Food["PoultryLeg"] = 5] = "PoultryLeg";
    Food[Food["PoultryFillet"] = 6] = "PoultryFillet";
    Food[Food["Egg"] = 7] = "Egg";
    Food[Food["EggWhite"] = 8] = "EggWhite";
    Food[Food["Soybean"] = 9] = "Soybean";
    Food[Food["Cheese"] = 10] = "Cheese";
    Food[Food["SkimCheese"] = 11] = "SkimCheese";
    Food[Food["Protein"] = 12] = "Protein";
    Food[Food["MassPorridge"] = 13] = "MassPorridge";
    Food[Food["BrownRice"] = 14] = "BrownRice";
    Food[Food["Couscous"] = 15] = "Couscous";
    Food[Food["Buckwheat"] = 16] = "Buckwheat";
    Food[Food["Oatmeal"] = 17] = "Oatmeal";
    Food[Food["BreadRolls"] = 18] = "BreadRolls";
    Food[Food["Beans"] = 19] = "Beans";
    Food[Food["Salad"] = 20] = "Salad";
    Food[Food["Berries"] = 21] = "Berries";
    Food[Food["DriedFruits"] = 22] = "DriedFruits";
    Food[Food["Honey"] = 23] = "Honey";
    Food[Food["Apple"] = 24] = "Apple";
    Food[Food["Banana"] = 25] = "Banana";
    Food[Food["Grapefruit"] = 26] = "Grapefruit";
    Food[Food["Kiwi"] = 27] = "Kiwi";
    Food[Food["Nuts"] = 28] = "Nuts";
    Food[Food["FishOil"] = 29] = "FishOil";
    Food[Food["Oil"] = 30] = "Oil";
    Food[Food["Avocado"] = 31] = "Avocado";
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
    FoodConsumable[FoodConsumable["Unit"] = 1] = "Unit";
    FoodConsumable[FoodConsumable["Portion"] = 2] = "Portion";
    FoodConsumable[FoodConsumable["Weight"] = 3] = "Weight";
    FoodConsumable[FoodConsumable["NoWeight"] = 4] = "NoWeight";
    FoodConsumable[FoodConsumable["TeaSpoon"] = 5] = "TeaSpoon";
})(FoodConsumable = exports.FoodConsumable || (exports.FoodConsumable = {}));
exports.FOOD = (_a = {},
    _a[Food.Salmon] = { consumable: FoodConsumable.Weight, type: [FoodType.Fish, FoodType.Expensive], protein: 20, fat: 13, carbo: 0, calories: 208, locId: localization_1.LocId.FoodSalmon, min: 100, max: 300, oneUse: true },
    _a[Food.WhiteFish] = { consumable: FoodConsumable.Weight, type: [FoodType.Fish], protein: 22, fat: 0, carbo: 0, calories: 111, locId: localization_1.LocId.FoodWhiteFish, min: 100, max: 300 },
    _a[Food.Seafood] = { consumable: FoodConsumable.Weight, type: [FoodType.Seafood], protein: 18, fat: 7, carbo: 0, calories: 175, locId: localization_1.LocId.FoodSeafood, min: 100, max: 300 },
    _a[Food.LeanBeef] = { consumable: FoodConsumable.Weight, type: [FoodType.Meat], protein: 20, fat: 7, carbo: 0, calories: 158, locId: localization_1.LocId.FoodLeanBeef, min: 100, max: 300 },
    _a[Food.LeanPork] = { consumable: FoodConsumable.Weight, type: [FoodType.Meat, FoodType.Gain], protein: 20, fat: 9, carbo: 0, calories: 164, locId: localization_1.LocId.FoodLeanPork, min: 100, max: 300 },
    _a[Food.PoultryLeg] = { consumable: FoodConsumable.Weight, type: [FoodType.Poultry, FoodType.Gain], protein: 18, fat: 13, carbo: 0, calories: 198, locId: localization_1.LocId.FoodPoultryLeg, min: 150, max: 450 },
    _a[Food.PoultryFillet] = { consumable: FoodConsumable.Weight, type: [FoodType.Poultry], protein: 20, fat: 0, carbo: 0, calories: 112, locId: localization_1.LocId.FoodPoultryFillet, min: 100, max: 300 },
    _a[Food.Egg] = { consumable: FoodConsumable.Unit, type: [FoodType.Eggs], protein: 6, fat: 5, carbo: 0, calories: 75, locId: localization_1.LocId.FoodEgg, max: 4, oneUse: true },
    _a[Food.EggWhite] = { consumable: FoodConsumable.Unit, type: [FoodType.Eggs], protein: 5, fat: 0, carbo: 0, calories: 25, locId: localization_1.LocId.FoodEggWhite, max: 5, oneUse: true },
    _a[Food.Soybean] = { consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 36, fat: 20, carbo: 30, calories: 446, locId: localization_1.LocId.FoodSoybean },
    _a[Food.Cheese] = { consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.GainSupport], protein: 20, fat: 5, carbo: 0, calories: 145, locId: localization_1.LocId.FoodCheese, min: 100, max: 300, oneUse: true },
    _a[Food.SkimCheese] = { consumable: FoodConsumable.Weight, type: [FoodType.Milk, FoodType.Loss], protein: 20, fat: 0, carbo: 0, calories: 110, locId: localization_1.LocId.FoodSkimCheese, min: 100, max: 300, oneUse: true },
    _a[Food.Protein] = { consumable: FoodConsumable.Portion, type: [FoodType.SportNutrition], protein: 20, fat: 0, carbo: 0, calories: 88, locId: localization_1.LocId.FoodProtein, min: 1, max: 2, oneUse: true },
    _a[Food.MassPorridge] = { consumable: FoodConsumable.Weight, type: [FoodType.GainSupport], protein: 0, fat: 0, carbo: 78, calories: 344, locId: localization_1.LocId.FoodMassPorridge, min: 40, max: 300 },
    _a[Food.BrownRice] = { consumable: FoodConsumable.Weight, type: [FoodType.Expensive], protein: 0, fat: 0, carbo: 72, calories: 343, locId: localization_1.LocId.FoodBrownRice, min: 40, max: 250 },
    _a[Food.Couscous] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 72, calories: 376, locId: localization_1.LocId.FoodBrownRice, min: 40, max: 250 },
    _a[Food.Buckwheat] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 64, calories: 343, locId: localization_1.LocId.FoodBuckwheat, min: 40, max: 250 },
    _a[Food.Oatmeal] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 62, calories: 352, locId: localization_1.LocId.FoodOatmeal, min: 20, max: 200 },
    _a[Food.BreadRolls] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 0, carbo: 80, calories: 352, locId: localization_1.LocId.FoodBreadRolls, min: 20, max: 100, oneUse: true },
    _a[Food.Beans] = { consumable: FoodConsumable.Weight, type: [FoodType.Vegan], protein: 0, fat: 0, carbo: 64, calories: 347, locId: localization_1.LocId.FoodBeans },
    _a[Food.Salad] = { consumable: FoodConsumable.NoWeight, type: [], protein: 0, fat: 0, carbo: 5, calories: 347, locId: localization_1.LocId.FoodSalad, max: 100 },
    _a[Food.Berries] = { consumable: FoodConsumable.Weight, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 16, calories: 57, locId: localization_1.LocId.FoodBerries, min: 30 },
    _a[Food.DriedFruits] = { consumable: FoodConsumable.Weight, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 83, calories: 359, locId: localization_1.LocId.FoodBerries, min: 40 },
    _a[Food.Honey] = { consumable: FoodConsumable.TeaSpoon, type: [FoodType.GainSupport], protein: 0, fat: 0, carbo: 6, calories: 23, locId: localization_1.LocId.FoodHoney, max: 3 },
    _a[Food.Apple] = { consumable: FoodConsumable.Piece, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 10, calories: 60, locId: localization_1.LocId.FoodApple, max: 2 },
    _a[Food.Banana] = { consumable: FoodConsumable.Piece, type: [FoodType.Fruits, FoodType.GainSupport], protein: 0, fat: 0, carbo: 25, calories: 105, locId: localization_1.LocId.FoodBanana, max: 2, oneUse: true },
    _a[Food.Grapefruit] = { consumable: FoodConsumable.Piece, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 20, calories: 105, locId: localization_1.LocId.FoodGrapefruit, max: 1, oneUse: true },
    _a[Food.Kiwi] = { consumable: FoodConsumable.Unit, type: [FoodType.Fruits], protein: 0, fat: 0, carbo: 11, calories: 46, locId: localization_1.LocId.FoodKiwi, max: 2 },
    _a[Food.Nuts] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 50, carbo: 0, calories: 610, locId: localization_1.LocId.FoodNuts, min: 20 },
    _a[Food.FishOil] = { consumable: FoodConsumable.Unit, type: [FoodType.SportNutrition], protein: 0, fat: 2, carbo: 0, calories: 18, locId: localization_1.LocId.FoodFishOil, max: 3 },
    _a[Food.Oil] = { consumable: FoodConsumable.Weight, type: [], protein: 0, fat: 100, carbo: 0, calories: 884, locId: localization_1.LocId.FoodOil, min: 5, max: 15 },
    _a[Food.Avocado] = { consumable: FoodConsumable.Piece, type: [FoodType.Fish, FoodType.Expensive], protein: 0, fat: 30, carbo: 0, calories: 160, locId: localization_1.LocId.FoodAvocado, max: 1, oneUse: true },
    _a);
