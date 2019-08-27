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
var TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
var Bot = /** @class */ (function () {
    function Bot() {
        this._bot = new TelegramBot(process.env.TOKEN || '', { polling: true });
        this._history = {};
    }
    Bot.prototype.init = function (messageHandler, callbackHandler) {
        this._bot.on('callback_query', callbackHandler);
        this._bot.on('message', messageHandler);
        this._bot.on('message', this.onReceiveMessage.bind(this));
        this._bot.on("polling_error", this.onErrorHandler.bind(this));
        // this._bot.onText(/\/clear/, (msg, match) => {
        //     const chatId = msg.chat.id;
        //     this.clearHistory(chatId);
        // });
    };
    Bot.prototype.deleteMessage = function (chatId, msgId) {
        var _this = this;
        this._bot.deleteMessage(chatId, msgId.toString())
            .then(function (value) {
            if (true) {
                _this._history[chatId].splice(msgId);
            }
        })
            .catch(function (error) {
            console.log('Error deleteMessage!', error);
        });
    };
    Bot.prototype.sendMessage = function (chatId, msgText, deleteLastMsg, options) {
        var _this = this;
        if (deleteLastMsg === void 0) { deleteLastMsg = true; }
        if (deleteLastMsg) {
            this.clearHistory(chatId, true);
        }
        this._bot.sendMessage(chatId, msgText, __assign({}, options, { parse_mode: "Markdown" }))
            .then(function (msg) {
            _this.addToHistory(msg);
        })
            .catch(function (error) {
            console.log('Error sendMessage!', error);
        });
    };
    Bot.prototype.clearHistory = function (chatId, lastOnly) {
        var _this = this;
        if (lastOnly === void 0) { lastOnly = false; }
        var history = this._history[chatId];
        if (!history) {
            return;
        }
        if (lastOnly) {
            this.deleteMessage(chatId, history[history.length - 1]);
        }
        else {
            history.forEach(function (msgId) { return _this.deleteMessage(chatId, msgId); });
        }
    };
    Bot.prototype.addToHistory = function (msg) {
        var chatId = msg.chat.id;
        if (!this._history[chatId]) {
            this._history[chatId] = [];
        }
        this._history[chatId].push(msg.message_id);
    };
    Bot.prototype.onReceiveMessage = function (msg) {
        this.addToHistory(msg);
    };
    Bot.prototype.onErrorHandler = function (err) {
        console.log('Polling error!', err);
    };
    return Bot;
}());
exports.Bot = Bot;
