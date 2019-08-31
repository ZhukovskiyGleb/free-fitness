"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require("node-telegram-bot-api");
var utils_1 = require("../utils/utils");
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
        // this._bot.onText(/\/clear(.+)/, (msg, match) => {
        //     log('Clear', match);
        // });
    };
    Bot.prototype.deleteMessage = function (chatId, msgId) {
        var _this = this;
        this._bot.deleteMessage(chatId, msgId.toString())
            .then(function (value) {
            if (value) {
                _this._history[chatId].splice(msgId, 1);
            }
        })
            .catch(function (error) {
            utils_1.log('Error deleteMessage!', error.message);
        });
    };
    Bot.prototype.sendMessage = function (chatId, msgText, keyboard, deleteLastMsg) {
        var _this = this;
        if (deleteLastMsg === void 0) { deleteLastMsg = true; }
        if (deleteLastMsg) {
            this.clearHistory(chatId, true);
        }
        var options = {
            parse_mode: "Markdown",
        };
        if (keyboard) {
            options.reply_markup = {
                inline_keyboard: keyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            };
        }
        else {
            options.reply_markup = {
                force_reply: true
            };
        }
        this._bot.sendMessage(chatId, msgText, options)
            .then(function (msg) {
            _this.addToHistory(msg);
        })
            .catch(function (error) {
            utils_1.log('Error sendMessage!', error);
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
        utils_1.log('Polling error!', err.message);
    };
    return Bot;
}());
exports.Bot = Bot;
