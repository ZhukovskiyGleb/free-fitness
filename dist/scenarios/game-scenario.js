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
var localization_1 = require("../localization/localization");
var GameScenario = /** @class */ (function (_super) {
    __extends(GameScenario, _super);
    function GameScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.COMPLETE_STATE = 'COMPLETE_STATE';
        _this.GAME_DATA = 'GAME_DATA';
        return _this;
    }
    GameScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang;
            _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterGreeting), true, _this.getRaceGreetingKeyboard(lang));
            return false;
        });
    };
    GameScenario.prototype.getRaceGreetingKeyboard = function (lang) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterCreate),
                            callback_data: this.GAME_DATA
                        }]
                ]
            }
        };
    };
    GameScenario.prototype.destroy = function () {
    };
    return GameScenario;
}(scenario_1.Scenario));
exports.GameScenario = GameScenario;
