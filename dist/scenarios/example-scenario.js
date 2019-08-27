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
var ExampleScenario = /** @class */ (function (_super) {
    __extends(ExampleScenario, _super);
    function ExampleScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TEST_DATA = 'TEST_DATA';
        return _this;
    }
    ExampleScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang, data = params.data;
            switch (data) {
                case _this.TEST_DATA:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LOC_ID.Test), true, _this.getKeyboard(lang));
                    break;
            }
            return false;
        });
    };
    ExampleScenario.prototype.getKeyboard = function (lang) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.Test),
                            callback_data: this.TEST_DATA
                        }]
                ]
            }
        };
    };
    ExampleScenario.prototype.destroy = function () {
    };
    return ExampleScenario;
}(scenario_1.Scenario));
exports.ExampleScenario = ExampleScenario;
