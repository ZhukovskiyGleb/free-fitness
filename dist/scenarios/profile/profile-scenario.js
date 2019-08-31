"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scenario_1 = require("../scenario");
var keyboard_maker_1 = require("../../utils/keyboard-maker");
var user_1 = require("../../user/user");
var localization_1 = require("../../localization/localization");
var profile_utils_1 = require("./profile-utils");
var utils_1 = require("../../utils/utils");
var config_1 = require("../../configs/config");
var ProfileScenario = /** @class */ (function (_super) {
    __extends(ProfileScenario, _super);
    function ProfileScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.APPROVE_PROPS_CORRECT_STATE = 'PROFILE_APPROVE_STATE';
        _this.CHECK_EDIT_STATE = 'PROFILE_CHECK_EDIT_STATE';
        _this.CONFIRM_EDIT_STATE = 'PROFILE_CONFIRM_EDIT_STATE';
        _this.EDIT_STATE = 'PROFILE_EDIT_STATE';
        _this.NEXT_EDIT_STATE = 'PROFILE_NEXT_EDIT_STATE';
        _this.EDIT_WEIGHT_STATE = 'PROFILE_WEIGHT_STATE';
        _this.EDIT_HEIGHT_STATE = 'PROFILE_HEIGHT_STATE';
        _this.EDIT_AGE_STATE = 'PROFILE_AGE_STATE';
        _this.EDIT_GENDER_STATE = 'PROFILE_GENDER_STATE';
        _this.EDIT_BODY_TYPE_STATE = 'PROFILE_BODY_TYPE_STATE';
        _this.EDIT_ACTIVITY_STATE = 'PROFILE_EDIT_ACTIVITY_STATE';
        _this.EDIT_EXPERIENCE_STATE = 'PROFILE_EDIT_EXPERIENCE_STATE';
        _this._utils = new profile_utils_1.ProfileUtils();
        return _this;
    }
    ProfileScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var userId = params.userId, chatId = params.chatId, lang = params.lang;
            var user = _this._userManager.getUser(userId);
            var requestedProperties = _this.requestedData;
            utils_1.log('Requested', requestedProperties);
            if (user && requestedProperties) {
                if (user.hasProperties(requestedProperties)) {
                    _this._bot.sendMessage(chatId, _this.getApproveText(lang, user, requestedProperties), _this.getApproveKeyboard(lang));
                    _this.setState(_this.APPROVE_PROPS_CORRECT_STATE);
                }
                else {
                    _this.setState(_this.EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                }
            }
            else {
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.APPROVE_PROPS_CORRECT_STATE, function (params) {
            var callback = params.callback;
            switch (callback) {
                case profile_utils_1.ProfileUtils.APPROVE_CALLBACK:
                    return scenario_1.ActionResults.ReadyForDestroy;
                case profile_utils_1.ProfileUtils.EDIT_CALLBACK:
                    _this.setState(_this.CHECK_EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
            }
        });
        this.addAction(this.CHECK_EDIT_STATE, function (params) {
            var chatId = params.chatId, userId = params.userId, lang = params.lang;
            var user = _this._userManager.getUser(userId);
            if (user) {
                var lastEditDate = user.properties.lastEditDate;
                if (lastEditDate) {
                    var daysToEdit = utils_1.getDaysPast(lastEditDate, config_1.Config.daysBeforeEdit);
                    _this._bot.sendMessage(chatId, _this.getCheckEditText(lang, daysToEdit), _this.getCheckEditKeyboard(lang, daysToEdit));
                    _this.setState(_this.CONFIRM_EDIT_STATE);
                }
                else {
                    _this.setState(_this.EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                }
            }
            else {
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.CONFIRM_EDIT_STATE, function (params) {
            var callback = params.callback, userId = params.userId;
            switch (callback) {
                case profile_utils_1.ProfileUtils.CONTINUE_CALLBACK:
                    var user = _this._userManager.getUser(userId);
                    if (user) {
                        user.setProperty(user_1.UserProperty.LastEditDate, new Date().getTime());
                    }
                    _this.setState(_this.EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                case profile_utils_1.ProfileUtils.BACK_CALLBACK:
                    return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.EDIT_STATE, function (params) {
            _this._propsToEdit = _this.requestedData.slice();
            if (_this._propsToEdit && _this._propsToEdit.length > 0) {
                _this.setState(_this.NEXT_EDIT_STATE);
                return scenario_1.ActionResults.Repeat;
            }
            else {
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.NEXT_EDIT_STATE, function (params) {
            if (_this._propsToEdit && _this._propsToEdit.length > 0) {
                var property = _this._propsToEdit.shift();
                utils_1.log('Ask for property', property);
                switch (property) {
                    case user_1.UserProperty.Age:
                        _this.setState(_this.EDIT_AGE_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Gender:
                        _this.setState(_this.EDIT_GENDER_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Height:
                        _this.setState(_this.EDIT_HEIGHT_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Weight:
                        _this.setState(_this.EDIT_WEIGHT_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.BodyType:
                        _this.setState(_this.EDIT_BODY_TYPE_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Activity:
                        _this.setState(_this.EDIT_ACTIVITY_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Experience:
                        _this.setState(_this.EDIT_EXPERIENCE_STATE);
                        return scenario_1.ActionResults.Repeat;
                    default:
                        return scenario_1.ActionResults.ReadyForDestroy;
                }
            }
            else {
                var userId = params.userId;
                var user = _this._userManager.getUser(userId);
                utils_1.log('No properties for ask');
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.EDIT_AGE_STATE, function (params) {
            return _this.checkTextInput(params, /^[0-9][0-9]?$/, { min: 10, max: 99 }, user_1.UserProperty.Age, localization_1.LocId.InputAge);
        });
        this.addAction(this.EDIT_GENDER_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang, callback = params.callback, userId = params.userId;
            switch (callback) {
                case profile_utils_1.ProfileUtils.GENDER_MALE_CALLBACK:
                case profile_utils_1.ProfileUtils.GENDER_FEMALE_CALLBACK:
                    _this.setPropertyByCallback(callback, userId);
                    _this.setState(_this.NEXT_EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.InputGender), _this.getGenderKeyboard(lang));
            }
        });
        this.addAction(this.EDIT_HEIGHT_STATE, function (params) {
            return _this.checkTextInput(params, /^[0-9][0-9]?[0-9]?$/, { min: 50, max: 250 }, user_1.UserProperty.Height, localization_1.LocId.InputHeight);
        });
        this.addAction(this.EDIT_WEIGHT_STATE, function (params) {
            return _this.checkTextInput(params, /^[0-9][0-9]?[0-9]?$/, { min: 30, max: 200 }, user_1.UserProperty.Weight, localization_1.LocId.InputWeight);
        });
        this.addAction(this.EDIT_BODY_TYPE_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang, callback = params.callback, userId = params.userId;
            switch (callback) {
                case profile_utils_1.ProfileUtils.BODY_TYPE_THIN_CALLBACK:
                case profile_utils_1.ProfileUtils.BODY_TYPE_MUSCULAR_CALLBACK:
                case profile_utils_1.ProfileUtils.BODY_TYPE_LARGE_CALLBACK:
                case profile_utils_1.ProfileUtils.BODY_TYPE_OVERWEIGHT_CALLBACK:
                case profile_utils_1.ProfileUtils.BODY_TYPE_COMMON_CALLBACK:
                    _this.setPropertyByCallback(callback, userId);
                    _this.setState(_this.NEXT_EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.InputBodyType), _this.getBodyTypeKeyboard(lang));
            }
        });
        this.addAction(this.EDIT_ACTIVITY_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang, callback = params.callback, userId = params.userId;
            switch (callback) {
                case profile_utils_1.ProfileUtils.ACTIVITY_NOTHING_CALLBACK:
                case profile_utils_1.ProfileUtils.ACTIVITY_EASY_CALLBACK:
                case profile_utils_1.ProfileUtils.ACTIVITY_AVERAGE_CALLBACK:
                case profile_utils_1.ProfileUtils.ACTIVITY_HEAVY_CALLBACK:
                    _this.setPropertyByCallback(callback, userId);
                    _this.setState(_this.NEXT_EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.InputActivity), _this.getActivityKeyboard(lang));
            }
        });
        this.addAction(this.EDIT_EXPERIENCE_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang, callback = params.callback, userId = params.userId;
            switch (callback) {
                case profile_utils_1.ProfileUtils.EXPERIENCE_JUNIOR_CALLBACK:
                case profile_utils_1.ProfileUtils.EXPERIENCE_MIDDLE_CALLBACK:
                case profile_utils_1.ProfileUtils.EXPERIENCE_SENIOR_CALLBACK:
                    _this.setPropertyByCallback(callback, userId);
                    _this.setState(_this.NEXT_EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                default:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.InputExperience), _this.getExperienceKeyboard(lang));
            }
        });
    };
    ProfileScenario.prototype.setPropertyByCallback = function (callback, userId) {
        var user = this._userManager.getUser(userId);
        if (user) {
            var _a = this._utils.getPropertyValueByCallback(callback), property = _a.property, value = _a.value;
            if (utils_1.isSomething(property) && utils_1.isSomething(value)) {
                user.setProperty(property, value);
            }
        }
    };
    ProfileScenario.prototype.checkTextInput = function (params, regexp, range, property, locId) {
        var text = params.text, chatId = params.chatId, lang = params.lang, userId = params.userId;
        if (text && text.match(regexp)) {
            var value = parseInt(text, 10);
            if (value < range.min || value > range.max) {
                this.sendIncorrectInput(chatId, lang);
            }
            else {
                var user = this._userManager.getUser(userId);
                if (user) {
                    user.setProperty(property, value);
                }
                params.text = undefined;
                this.setState(this.NEXT_EDIT_STATE);
                return scenario_1.ActionResults.Repeat;
            }
        }
        else {
            this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, locId));
        }
    };
    ProfileScenario.prototype.sendIncorrectInput = function (chatId, lang) {
        this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LocId.InputIncorrect), undefined, false);
    };
    ProfileScenario.prototype.getApproveText = function (lang, user, properties) {
        return localization_1.Localization.loc(lang, localization_1.LocId.ApproveProps) + '\n' +
            this._utils.getPropertiesDescription(lang, user, properties).join('\n');
    };
    ProfileScenario.prototype.getApproveKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonApprove), profile_utils_1.ProfileUtils.APPROVE_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonEdit), profile_utils_1.ProfileUtils.EDIT_CALLBACK)
            .result;
    };
    ProfileScenario.prototype.getCheckEditText = function (lang, daysToEdit) {
        if (daysToEdit > 0) {
            return localization_1.Localization.loc(lang, localization_1.LocId.EditError, { days: daysToEdit.toString() });
        }
        else {
            return localization_1.Localization.loc(lang, localization_1.LocId.EditWarning, { days: daysToEdit.toString() });
        }
    };
    ProfileScenario.prototype.getCheckEditKeyboard = function (lang, daysToEdit) {
        var keyboard = new keyboard_maker_1.KeyboardMaker();
        if (daysToEdit <= 0) {
            keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonContinue), profile_utils_1.ProfileUtils.CONTINUE_CALLBACK);
        }
        keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonBack), profile_utils_1.ProfileUtils.BACK_CALLBACK);
        return keyboard.result;
    };
    ProfileScenario.prototype.getGenderKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.GenderMale), profile_utils_1.ProfileUtils.GENDER_MALE_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.GenderFemale), profile_utils_1.ProfileUtils.GENDER_FEMALE_CALLBACK)
            .result;
    };
    ProfileScenario.prototype.getBodyTypeKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.BodyTypeThin), profile_utils_1.ProfileUtils.BODY_TYPE_THIN_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.BodyTypeMuscular), profile_utils_1.ProfileUtils.BODY_TYPE_MUSCULAR_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.BodyTypeLarge), profile_utils_1.ProfileUtils.BODY_TYPE_LARGE_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.BodyTypeOverweight), profile_utils_1.ProfileUtils.BODY_TYPE_OVERWEIGHT_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.BodyTypeCommon), profile_utils_1.ProfileUtils.BODY_TYPE_COMMON_CALLBACK)
            .result;
    };
    ProfileScenario.prototype.getActivityKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ActivityNothing), profile_utils_1.ProfileUtils.ACTIVITY_NOTHING_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ActivityEasy), profile_utils_1.ProfileUtils.ACTIVITY_EASY_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ActivityAverage), profile_utils_1.ProfileUtils.ACTIVITY_AVERAGE_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ActivityHeavy), profile_utils_1.ProfileUtils.ACTIVITY_HEAVY_CALLBACK)
            .result;
    };
    ProfileScenario.prototype.getExperienceKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ExperienceJunior), profile_utils_1.ProfileUtils.EXPERIENCE_JUNIOR_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ExperienceMiddle), profile_utils_1.ProfileUtils.EXPERIENCE_MIDDLE_CALLBACK)
            .nextLine()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ExperienceSenior), profile_utils_1.ProfileUtils.EXPERIENCE_SENIOR_CALLBACK)
            .result;
    };
    ProfileScenario.prototype.destroy = function () {
        delete this._propsToEdit;
        _super.prototype.destroy.call(this);
    };
    return ProfileScenario;
}(scenario_1.Scenario));
exports.ProfileScenario = ProfileScenario;
