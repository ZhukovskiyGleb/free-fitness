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
var localization_1 = require("../localization/localization");
var profile_utils_1 = require("../utils/profile-utils");
var ProfileScenario = /** @class */ (function (_super) {
    __extends(ProfileScenario, _super);
    function ProfileScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.APPROVE_STATE = 'PROFILE_APPROVE_STATE';
        _this.CHECK_EDIT_STATE = 'PROFILE_CHECK_EDIT_STATE';
        _this.APPROVE_CALLBACK = 'PROFILE_APPROVE_CALLBACK';
        _this.EDIT_CALLBACK = 'PROFILE_EDIT_CALLBACK';
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
                    _this._bot.sendMessage(chatId, _this._utils.getPropertiesDescription(lang, user, requestedProperties), _this.getApproveKeyboard(lang));
                    _this.setState(_this.APPROVE_STATE);
                }
                else {
                    _this.setState(_this.CHECK_EDIT_STATE);
                    return scenario_1.ActionResults.Repeat;
                }
            }
            else {
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
        this.addAction(this.APPROVE_STATE, function (params) {
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
            var userId = params.userId;
            var user = _this._userManager.getUser(userId);
            if (user) {
                var lastEditDate = user.properties.lastEditDate;
                _this._utils.getDaysBeforeEdit(lastEditDate);
            }
            else {
                return scenario_1.ActionResults.ReadyForDestroy;
            }
        });
    };
    ProfileScenario.prototype.getApproveKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonApprove), this.APPROVE_CALLBACK)
            .addButton(localization_1.Localization.loc(lang, localization_1.LocId.ButtonEdit), this.EDIT_CALLBACK)
            .result;
    };
    ProfileScenario.prototype.destroy = function () {
    };
    return ProfileScenario;
}(scenario_1.Scenario));
exports.ProfileScenario = ProfileScenario;
