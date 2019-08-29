import TelegramBot = require("node-telegram-bot-api");
import {CallbackQuery, InlineKeyboardButton, Message, SendMessageOptions} from "node-telegram-bot-api";

require("dotenv").config();

export class Bot {
    private readonly _bot = new TelegramBot(process.env.TOKEN || '', {polling: true});
    private readonly _history: {[key: number]: number[]} = {};

    constructor() {

    }

    init (messageHandler: (msg: Message) => void, callbackHandler: (query: CallbackQuery) => void): void {
        this._bot.on('callback_query', callbackHandler);
        this._bot.on('message', messageHandler);

        this._bot.on('message', this.onReceiveMessage.bind(this));

        this._bot.on("polling_error", this.onErrorHandler.bind(this));

        // this._bot.onText(/\/clear(.+)/, (msg, match) => {
        //     console.log('Clear', match);
        // });
    }

    public deleteMessage(chatId: number, msgId: number): void {
        this._bot.deleteMessage(chatId, msgId.toString())
        .then(
            value => {
                if (value) {
                    this._history[chatId].splice(msgId);
                }
            }
        )
        .catch(
            error => {
                console.log('Error deleteMessage!', error);
            }
        );
    }

    public sendMessage(chatId: number, msgText: string, keyboard?: InlineKeyboardButton[][], deleteLastMsg: boolean = true): void {
        if (deleteLastMsg) {
            this.clearHistory(chatId, true);
        }

        const options: SendMessageOptions = {
            parse_mode: "Markdown",
        };

        if (keyboard) {
            options.reply_markup = {
                inline_keyboard: keyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            };
        }

        this._bot.sendMessage(chatId, msgText, options)
        .then(
            (msg: Message) => {
                this.addToHistory(msg);
            }
        )
        .catch(
            (error) => {
                console.log('Error sendMessage!', error);
            }
        );
    }

    public clearHistory(chatId: number, lastOnly: boolean = false): void {
        const history = this._history[chatId];

        if (!history) {
            return;
        }

        if (lastOnly) {
            this.deleteMessage(chatId, history[history.length - 1]);
        } else {
            history.forEach(
                msgId => this.deleteMessage(chatId, msgId)
            );
        }
    }

    private addToHistory(msg: Message): void {
        const chatId = msg.chat.id;

        if (!this._history[chatId]) {
            this._history[chatId] = [];
        }

        this._history[chatId].push(msg.message_id);
    }

    private onReceiveMessage(msg: Message): void {
        this.addToHistory(msg);
    }

    private onErrorHandler(err: Error): void {
        console.log('Polling error!', err.message);
    }
}
