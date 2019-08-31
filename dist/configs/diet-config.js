"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
var DietTarget;
(function (DietTarget) {
    DietTarget[DietTarget["Loss"] = 0] = "Loss";
    DietTarget[DietTarget["Support"] = 1] = "Support";
    DietTarget[DietTarget["Gain"] = 2] = "Gain";
})(DietTarget = exports.DietTarget || (exports.DietTarget = {}));
var Formation;
(function (Formation) {
    Formation[Formation["Variety"] = 0] = "Variety";
    Formation[Formation["Monotony"] = 1] = "Monotony";
})(Formation = exports.Formation || (exports.Formation = {}));
var DietDaysAmount;
(function (DietDaysAmount) {
    DietDaysAmount[DietDaysAmount["Three"] = 0] = "Three";
    DietDaysAmount[DietDaysAmount["Four"] = 1] = "Four";
    DietDaysAmount[DietDaysAmount["Five"] = 2] = "Five";
    DietDaysAmount[DietDaysAmount["Six"] = 3] = "Six";
})(DietDaysAmount = exports.DietDaysAmount || (exports.DietDaysAmount = {}));
var MealName;
(function (MealName) {
    MealName[MealName["Breakfast"] = 0] = "Breakfast";
    MealName[MealName["Brunch"] = 1] = "Brunch";
    MealName[MealName["Lunch"] = 2] = "Lunch";
    MealName[MealName["HighTea"] = 3] = "HighTea";
    MealName[MealName["Dinner"] = 4] = "Dinner";
    MealName[MealName["LateDinner"] = 5] = "LateDinner";
})(MealName || (MealName = {}));
var DietConfig = /** @class */ (function () {
    function DietConfig() {
    }
    DietConfig.prototype.gatDaySchedule = function (days) {
        return DietConfig.DAYS_SCHEDULE[days];
    };
    DietConfig.prototype.getDailyRequirements = function (target) {
        return DietConfig.DAILY_REQUIREMENTS[target];
    };
    DietConfig.DAILY_REQUIREMENTS = (_a = {},
        _a[DietTarget.Loss] = { protein: 30, fat: 30, carbo: 40 },
        _a[DietTarget.Support] = { protein: 35, fat: 40, carbo: 35 },
        _a[DietTarget.Gain] = { protein: 25, fat: 25, carbo: 50 },
        _a);
    DietConfig.DAYS_SCHEDULE = (_b = {},
        _b[DietDaysAmount.Three] = (_c = {},
            _c[MealName.Breakfast] = { protein: 30, fat: 40, carbo: 30 },
            _c[MealName.Lunch] = { protein: 30, fat: 30, carbo: 40 },
            _c[MealName.Dinner] = { protein: 40, fat: 30, carbo: 30 },
            _c),
        _b[DietDaysAmount.Four] = (_d = {},
            _d[MealName.Breakfast] = { protein: 20, fat: 40, carbo: 0 },
            _d[MealName.Brunch] = { protein: 20, fat: 0, carbo: 30 },
            _d[MealName.Lunch] = { protein: 20, fat: 30, carbo: 40 },
            _d[MealName.Dinner] = { protein: 40, fat: 30, carbo: 30 },
            _d),
        _b[DietDaysAmount.Five] = (_e = {},
            _e[MealName.Breakfast] = { protein: 15, fat: 40, carbo: 0 },
            _e[MealName.Brunch] = { protein: 15, fat: 0, carbo: 30 },
            _e[MealName.Lunch] = { protein: 20, fat: 30, carbo: 30 },
            _e[MealName.HighTea] = { protein: 20, fat: 0, carbo: 20 },
            _e[MealName.Dinner] = { protein: 30, fat: 30, carbo: 20 },
            _e),
        _b[DietDaysAmount.Six] = (_f = {},
            _f[MealName.Breakfast] = { protein: 15, fat: 40, carbo: 0 },
            _f[MealName.Brunch] = { protein: 15, fat: 0, carbo: 30 },
            _f[MealName.Lunch] = { protein: 20, fat: 30, carbo: 30 },
            _f[MealName.HighTea] = { protein: 15, fat: 0, carbo: 20 },
            _f[MealName.Dinner] = { protein: 20, fat: 15, carbo: 20 },
            _f[MealName.LateDinner] = { protein: 15, fat: 15, carbo: 20 },
            _f),
        _b);
    return DietConfig;
}());
exports.DietConfig = DietConfig;
