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
var ExampleScenario = /** @class */ (function (_super) {
    __extends(ExampleScenario, _super);
    function ExampleScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TEST_CALLBACK = 'TEST_CALLBACK';
        return _this;
    }
    ExampleScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang, callback = params.callback;
            switch (callback) {
                case _this.TEST_CALLBACK:
                    _this._bot.sendMessage(chatId, 'Localization.loc(lang, LOC_ID.Test)', _this.getKeyboard(lang));
                    break;
                default:
                    _this._bot.sendMessage(chatId, 'Localization.loc(lang, LOC_ID.Test2)', _this.getKeyboard(lang));
                    break;
            }
        });
    };
    ExampleScenario.prototype.getKeyboard = function (lang) {
        return new keyboard_maker_1.KeyboardMaker()
            .addButton('Localization.loc(lang, LOC_ID.Test)', this.TEST_CALLBACK)
            .result;
    };
    ExampleScenario.prototype.destroy = function () {
    };
    return ExampleScenario;
}(scenario_1.Scenario));
exports.ExampleScenario = ExampleScenario;
