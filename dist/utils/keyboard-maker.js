"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var KeyboardMaker = /** @class */ (function () {
    function KeyboardMaker() {
        this._keyboard = [[]];
    }
    KeyboardMaker.prototype.updateCheckbox = function (callback, value) {
        if (this._checkboxes && this._checkboxes[callback]) {
            var config = this._checkboxes[callback];
            if (utils_1.isSomething(value)) {
                config.value = value;
            }
            else {
                config.value = !config.value;
            }
            this.updateCheckboxText(callback);
        }
    };
    KeyboardMaker.prototype.addButton = function (text, callback, checkbox) {
        var lastLine = this._keyboard[this._keyboard.length - 1];
        var button = {
            text: '',
            callback_data: callback
        };
        if (utils_1.isSomething(checkbox)) {
            if (!this._checkboxes) {
                this._checkboxes = {};
            }
            this._checkboxes[callback] = {
                value: checkbox,
                text: text.toUpperCase(),
                button: button
            };
            this.updateCheckboxText(callback);
        }
        else {
            button.text = text.toUpperCase();
        }
        lastLine.push(button);
        return this;
    };
    KeyboardMaker.prototype.updateCheckboxText = function (callback) {
        if (this._checkboxes && this._checkboxes[callback]) {
            var config = this._checkboxes[callback];
            config.button.text = (config.value ? '☑ ' : '☒ ') + config.text;
        }
    };
    KeyboardMaker.prototype.nextLine = function () {
        this._keyboard.push([]);
        return this;
    };
    Object.defineProperty(KeyboardMaker.prototype, "result", {
        get: function () {
            return this._keyboard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardMaker.prototype, "checkboxes", {
        get: function () {
            var result = [];
            if (this._checkboxes) {
                for (var config in this._checkboxes) {
                    result.push({ callback: config, value: this._checkboxes[config].value });
                }
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return KeyboardMaker;
}());
exports.KeyboardMaker = KeyboardMaker;
