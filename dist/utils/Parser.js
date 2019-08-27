"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.parseMessage = function (msg) {
        var common = this.parseCommon(msg);
        return common ? __assign({}, common, { chatId: msg.chat.id, text: msg.text, datetime: msg.date * 1000 }) : undefined;
    };
    Parser.parseQuery = function (query) {
        var common = this.parseCommon(query);
        return common ? __assign({}, common, { chatId: query.message ? query.message.chat.id : 0, callback: query.data, datetime: query.message ? query.message.date * 1000 : 0 }) : undefined;
    };
    Parser.parseCommon = function (data) {
        var userId = data.from ? data.from.id : 0;
        return userId > 0 ? {
            userId: userId,
            lang: data.from && data.from.language_code ? data.from.language_code : '',
            name: (data.from ? data.from.first_name : '') + (data.from && data.from.last_name ? data.from.last_name : ''),
            nickname: data.from ? data.from.username : ''
        } : undefined;
    };
    return Parser;
}());
exports.Parser = Parser;
