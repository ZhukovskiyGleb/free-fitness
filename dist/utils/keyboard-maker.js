"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardMaker = /** @class */ (function () {
    function KeyboardMaker() {
        this._keyboard = [[]];
    }
    KeyboardMaker.prototype.addButton = function (text, callback) {
        var lastLine = this._keyboard[this._keyboard.length - 1];
        lastLine.push({
            text: text.toUpperCase(),
            callback_data: callback
        });
        return this;
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
    return KeyboardMaker;
}());
exports.KeyboardMaker = KeyboardMaker;
