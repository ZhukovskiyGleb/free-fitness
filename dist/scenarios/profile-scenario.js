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
var scenario_1 = require("./scenario");
var keyboard_maker_1 = require("../utils/keyboard-maker");
var user_1 = require("../user/user");
var localization_1 = require("../localization/localization");
var profile_utils_1 = require("../utils/profile-utils");
var utils_1 = require("../utils/utils");
var config_1 = require("../config");
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
        _this.APPROVE_CALLBACK = 'PROFILE_APPROVE_CALLBACK';
        _this.EDIT_CALLBACK = 'PROFILE_EDIT_CALLBACK';
        _this.CONTINUE_CALLBACK = 'PROFILE_CONTINUE_CALLBACK';
        _this.BACK_CALLBACK = 'PROFILE_BACK_CALLBACK';
        _this._utils = new profile_utils_1.ProfileUtils();
        return _this;
    }
    ProfileScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var userId = params.userId, chatId = params.chatId, lang = params.lang;
            var user = _this._userManager.getUser(userId);
            var requestedProperties = _this.requestedData;
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
                case _this.APPROVE_CALLBACK:
                    return scenario_1.ActionResults.ReadyForDestroy;
                case _this.EDIT_CALLBACK:
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
                    var daysToEdit = utils_1.getPastDays(lastEditDate, config_1.Config.daysBeforeEdit);
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
                case _this.CONTINUE_CALLBACK:
                    var user = _this._userManager.getUser(userId);
                    if (user) {
                        user.setProperty(user_1.UserProperty.LastEditDate, new Date().getTime());
                    }
                    _this.setState(_this.EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                case _this.BACK_CALLBACK:
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
                switch (property) {
                    case user_1.UserProperty.Height:
                        _this.setState(_this.EDIT_HEIGHT_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Weight:
                        _this.setState(_this.EDIT_WEIGHT_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Age:
                        _this.setState(_this.EDIT_AGE_STATE);
                        return scenario_1.ActionResults.Repeat;
                    case user_1.UserProperty.Gender:
                        _this.setState(_this.EDIT_GENDER_STATE);
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
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.EDIT_WEIGHT_STATE, function (params) {
            var text = params.text;
            // if (text && text.match(/^[1-9]$|^[1-9]\d$/))
        });
    };
    ProfileScenario.prototype.getApproveText = function (lang, user, properties) {
        return localization_1.Localization.loc(lang, localization_1.LocId.ApproveProps) + '\n' +
            this._utils.getPropertiesDescription(lang, user, properties).join('\n');
    };
    ProfileScenario.prototype.getApproveKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonApprove), this.APPROVE_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonEdit), this.EDIT_CALLBACK)
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
            keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonContinue), this.CONTINUE_CALLBACK);
        }
        keyboard.addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonBack), this.BACK_CALLBACK);
        return keyboard.result;
    };
    ProfileScenario.prototype.destroy = function () {
    };
    return ProfileScenario;
}(scenario_1.Scenario));
exports.ProfileScenario = ProfileScenario;
