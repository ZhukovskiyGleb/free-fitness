"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../user/user");
var localization_1 = require("../localization/localization");
var utils_1 = require("./utils");
var ProfileUtils = /** @class */ (function () {
    function ProfileUtils() {
    }
    ProfileUtils.prototype.getPropertiesDescription = function (lang, user, properties) {
        var _this = this;
        var result = [];
        properties.forEach(function (property) {
            var value = _this.getPropertyValue(user, property, lang);
            var locId = ProfileUtils.PROPERTY_TO_LOC_ID[property];
            if (value && utils_1.isSomething(locId)) {
                result.push(localization_1.Localization.loc(lang, locId, { value: value }));
            }
        });
        return result;
    };
    ProfileUtils.prototype.getPropertyValue = function (user, property, lang) {
        var value = user.getProperty(property);
        if (utils_1.isSomething(value)) {
            var locId = ProfileUtils.PROPERTY_VALUE_TO_LOC_ID[value];
            if (locId) {
                return localization_1.Localization.loc(lang, locId);
            }
            else {
                return value;
            }
        }
    };
    ProfileUtils.PROPERTY_TO_LOC_ID = (_a = {},
        _a[user_1.UserProperty.Weight] = localization_1.LocId.PropertyWeight,
        _a[user_1.UserProperty.Height] = localization_1.LocId.PropertyHeight,
        _a[user_1.UserProperty.Age] = localization_1.LocId.PropertyAge,
        _a[user_1.UserProperty.Gender] = localization_1.LocId.PropertyGender,
        _a[user_1.UserProperty.BodyType] = localization_1.LocId.PropertyBodyType,
        _a[user_1.UserProperty.Activity] = localization_1.LocId.PropertyActivity,
        _a[user_1.UserProperty.Experience] = localization_1.LocId.PropertyExperience,
        _a);
    ProfileUtils.PROPERTY_VALUE_TO_LOC_ID = (_b = {},
        _b[user_1.Gender.Male] = localization_1.LocId.GenderMale,
        _b[user_1.Gender.Female] = localization_1.LocId.GenderFemale,
        _b[user_1.Activity.Nothing] = localization_1.LocId.ActivityNothing,
        _b[user_1.Activity.Easy] = localization_1.LocId.ActivityEasy,
        _b[user_1.Activity.Average] = localization_1.LocId.ActivityAverage,
        _b[user_1.Activity.Heavy] = localization_1.LocId.ActivityHeavy,
        _b[user_1.BodyType.Thin] = localization_1.LocId.BodyTypeThin,
        _b[user_1.BodyType.Muscular] = localization_1.LocId.BodyTypeMuscular,
        _b[user_1.BodyType.Large] = localization_1.LocId.BodyTypeLarge,
        _b[user_1.BodyType.Overweight] = localization_1.LocId.BodyTypeOverweight,
        _b[user_1.BodyType.Common] = localization_1.LocId.BodyTypeCommon,
        _b[user_1.Experience.Junior] = localization_1.LocId.ExperienceJunior,
        _b[user_1.Experience.Middle] = localization_1.LocId.ExperienceMiddle,
        _b[user_1.Experience.Senior] = localization_1.LocId.ExperienceSenior,
        _b);
    return ProfileUtils;
}());
exports.ProfileUtils = ProfileUtils;
