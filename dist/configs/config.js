"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.daysBeforeEdit = 7;
    Config.hoursBeforeGreeting = 8;
    Config.ageAfterWeightIndexLoss = 50;
    Config.largeOldIndexWeightLoss = 5;
    Config.muscularIndexWeightLoss = 10;
    Config.femaleFatPercentBonus = 7;
    Config.proteinCalories = 4;
    Config.carboCalories = 4;
    Config.fatCalories = 9;
    Config.minFatPortion = 5;
    Config.minSnackCarboPortion = 20;
    Config.minCarboPortion = 20;
    Config.maxMorningCarboMul = 1;
    Config.maxDayCarboMul = 1.5;
    Config.minPieceValue = .5;
    return Config;
}());
exports.Config = Config;
