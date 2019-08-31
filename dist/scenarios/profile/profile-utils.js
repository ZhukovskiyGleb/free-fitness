"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../user/user");
var localization_1 = require("../../localization/localization");
var utils_1 = require("../../utils/utils");
var ProfileUtils = /** @class */ (function () {
    function ProfileUtils() {
    }
    ProfileUtils.prototype.getPropertyValueByCallback = function (callback) {
        if (ProfileUtils.CALLBACK_TO_PROPERTY.hasOwnProperty(callback)) {
            return ProfileUtils.CALLBACK_TO_PROPERTY[callback];
        }
        return {};
    };
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
            var locId = ProfileUtils.PROPERTY_VALUE_TO_LOC_ID[value.toString()];
            if (locId) {
                return localization_1.Localization.loc(lang, locId);
            }
            else {
                return value.toString();
            }
        }
    };
    ProfileUtils.GENDER_MALE_CALLBACK = 'PROFILE_GENDER_MALE_CALLBACK';
    ProfileUtils.GENDER_FEMALE_CALLBACK = 'PROFILE_GENDER_FEMALE_CALLBACK';
    ProfileUtils.BODY_TYPE_THIN_CALLBACK = 'PROFILE_BODY_THIN_CALLBACK';
    ProfileUtils.BODY_TYPE_MUSCULAR_CALLBACK = 'PROFILE_BODY_MUSCULAR_CALLBACK';
    ProfileUtils.BODY_TYPE_LARGE_CALLBACK = 'PROFILE_BODY_LARGE_CALLBACK';
    ProfileUtils.BODY_TYPE_OVERWEIGHT_CALLBACK = 'PROFILE_BODY_OVERWEIGHT_CALLBACK';
    ProfileUtils.BODY_TYPE_COMMON_CALLBACK = 'PROFILE_BODY_COMMON_CALLBACK';
    ProfileUtils.ACTIVITY_NOTHING_CALLBACK = 'PROFILE_ACTIVITY_NOTHING_CALLBACK';
    ProfileUtils.ACTIVITY_EASY_CALLBACK = 'PROFILE_ACTIVITY_EASY_CALLBACK';
    ProfileUtils.ACTIVITY_AVERAGE_CALLBACK = 'PROFILE_ACTIVITY_AVERAGE_CALLBACK';
    ProfileUtils.ACTIVITY_HEAVY_CALLBACK = 'PROFILE_ACTIVITY_HEAVY_CALLBACK';
    ProfileUtils.EXPERIENCE_JUNIOR_CALLBACK = 'PROFILE_EXPERIENCE_JUNIOR_CALLBACK';
    ProfileUtils.EXPERIENCE_MIDDLE_CALLBACK = 'PROFILE_EXPERIENCE_MIDDLE_CALLBACK';
    ProfileUtils.EXPERIENCE_SENIOR_CALLBACK = 'PROFILE_EXPERIENCE_SENIOR_CALLBACK';
    ProfileUtils.APPROVE_CALLBACK = 'PROFILE_APPROVE_CALLBACK';
    ProfileUtils.EDIT_CALLBACK = 'PROFILE_EDIT_CALLBACK';
    ProfileUtils.CONTINUE_CALLBACK = 'PROFILE_CONTINUE_CALLBACK';
    ProfileUtils.BACK_CALLBACK = 'PROFILE_BACK_CALLBACK';
    ProfileUtils.CALLBACK_TO_PROPERTY = (_a = {},
        _a[ProfileUtils.GENDER_MALE_CALLBACK] = { property: user_1.UserProperty.Gender, value: user_1.Gender.Male },
        _a[ProfileUtils.GENDER_FEMALE_CALLBACK] = { property: user_1.UserProperty.Gender, value: user_1.Gender.Female },
        _a[ProfileUtils.BODY_TYPE_THIN_CALLBACK] = { property: user_1.UserProperty.BodyType, value: user_1.BodyType.Thin },
        _a[ProfileUtils.BODY_TYPE_MUSCULAR_CALLBACK] = { property: user_1.UserProperty.BodyType, value: user_1.BodyType.Muscular },
        _a[ProfileUtils.BODY_TYPE_LARGE_CALLBACK] = { property: user_1.UserProperty.BodyType, value: user_1.BodyType.Large },
        _a[ProfileUtils.BODY_TYPE_OVERWEIGHT_CALLBACK] = { property: user_1.UserProperty.BodyType, value: user_1.BodyType.Overweight },
        _a[ProfileUtils.BODY_TYPE_COMMON_CALLBACK] = { property: user_1.UserProperty.BodyType, value: user_1.BodyType.Common },
        _a[ProfileUtils.ACTIVITY_NOTHING_CALLBACK] = { property: user_1.UserProperty.Activity, value: user_1.Activity.Nothing },
        _a[ProfileUtils.ACTIVITY_EASY_CALLBACK] = { property: user_1.UserProperty.Activity, value: user_1.Activity.Easy },
        _a[ProfileUtils.ACTIVITY_AVERAGE_CALLBACK] = { property: user_1.UserProperty.Activity, value: user_1.Activity.Average },
        _a[ProfileUtils.ACTIVITY_HEAVY_CALLBACK] = { property: user_1.UserProperty.Activity, value: user_1.Activity.Heavy },
        _a[ProfileUtils.EXPERIENCE_JUNIOR_CALLBACK] = { property: user_1.UserProperty.Experience, value: user_1.Experience.Junior },
        _a[ProfileUtils.EXPERIENCE_MIDDLE_CALLBACK] = { property: user_1.UserProperty.Experience, value: user_1.Experience.Middle },
        _a[ProfileUtils.EXPERIENCE_SENIOR_CALLBACK] = { property: user_1.UserProperty.Experience, value: user_1.Experience.Senior },
        _a);
    ProfileUtils.PROPERTY_TO_LOC_ID = (_b = {},
        _b[user_1.UserProperty.Weight] = localization_1.LocId.PropertyWeight,
        _b[user_1.UserProperty.Height] = localization_1.LocId.PropertyHeight,
        _b[user_1.UserProperty.Age] = localization_1.LocId.PropertyAge,
        _b[user_1.UserProperty.Gender] = localization_1.LocId.PropertyGender,
        _b[user_1.UserProperty.BodyType] = localization_1.LocId.PropertyBodyType,
        _b[user_1.UserProperty.Activity] = localization_1.LocId.PropertyActivity,
        _b[user_1.UserProperty.Experience] = localization_1.LocId.PropertyExperience,
        _b);
    ProfileUtils.PROPERTY_VALUE_TO_LOC_ID = (_c = {},
        _c[user_1.Gender.Male] = localization_1.LocId.GenderMale,
        _c[user_1.Gender.Female] = localization_1.LocId.GenderFemale,
        _c[user_1.Activity.Nothing] = localization_1.LocId.ActivityNothing,
        _c[user_1.Activity.Easy] = localization_1.LocId.ActivityEasy,
        _c[user_1.Activity.Average] = localization_1.LocId.ActivityAverage,
        _c[user_1.Activity.Heavy] = localization_1.LocId.ActivityHeavy,
        _c[user_1.BodyType.Thin] = localization_1.LocId.BodyTypeThin,
        _c[user_1.BodyType.Muscular] = localization_1.LocId.BodyTypeMuscular,
        _c[user_1.BodyType.Large] = localization_1.LocId.BodyTypeLarge,
        _c[user_1.BodyType.Overweight] = localization_1.LocId.BodyTypeOverweight,
        _c[user_1.BodyType.Common] = localization_1.LocId.BodyTypeCommon,
        _c[user_1.Experience.Junior] = localization_1.LocId.ExperienceJunior,
        _c[user_1.Experience.Middle] = localization_1.LocId.ExperienceMiddle,
        _c[user_1.Experience.Senior] = localization_1.LocId.ExperienceSenior,
        _c);
    return ProfileUtils;
}());
exports.ProfileUtils = ProfileUtils;
