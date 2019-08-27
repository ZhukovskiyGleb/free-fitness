"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
var Bot = /** @class */ (function () {
    function Bot() {
        this.bot = new TelegramBot(process.env.TOKEN || '', { polling: true });
    }
    Bot.prototype.init = function (messageHandler) {
        console.log('bot inited!');
        this.bot.on('message', this.onMessageHandler.bind(this));
        this.bot.on("polling_error", this.onErrorHandler.bind(this));
    };
    Bot.prototype.onMessageHandler = function (msg) {
        var chatId = msg.chat.id;
        console.log('message', msg);
        this.bot.sendMessage(chatId, 'Received your message').then(function () {
            console.log('success!');
        }).catch(function (e) {
            console.log('Error!', e);
        });
    };
    Bot.prototype.onErrorHandler = function (err) {
        console.log('error', err);
    };
    return Bot;
}());
exports.Bot = Bot;
