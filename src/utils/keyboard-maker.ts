import {InlineKeyboardButton} from "node-telegram-bot-api";

export class KeyboardMaker {
    private readonly _keyboard:InlineKeyboardButton[][] = [[]];

    constructor() {

    }

    public addButton(text: string, callback: string): KeyboardMaker {
        const lastLine = this._keyboard[this._keyboard.length - 1];
        lastLine.push({
            text: text.toUpperCase(),
            callback_data: callback
        });

        return this;
    }

    public nextLine(): KeyboardMaker {
        this._keyboard.push([]);

        return this;
    }

    public get result(): InlineKeyboardButton[][] {
        return this._keyboard;
    }
}