import {InlineKeyboardButton} from "node-telegram-bot-api";
import {isSomething} from "./utils";

export interface Checkbox {callback: string, value: boolean}

export class KeyboardMaker {
    private readonly _keyboard:InlineKeyboardButton[][] = [[]];

    private _checkboxes?: {[key: string]: {value: boolean, text: string, button: InlineKeyboardButton}};

    constructor() {

    }

    public updateCheckbox(callback: string, value?: boolean): void {
        if (this._checkboxes && this._checkboxes[callback]) {
            const config = this._checkboxes[callback];
            if (isSomething(value)) {
                config.value = value;
            } else {
                config.value = !config.value;
            }
            this.updateCheckboxText(callback);
        }
    }

    public addButton(text: string, callback: string, checkbox?: boolean): KeyboardMaker {
        const lastLine = this._keyboard[this._keyboard.length - 1];
        const button = {
            text: '',
            callback_data: callback
        };
        if (isSomething(checkbox)) {
            if (!this._checkboxes) {
                this._checkboxes = {};
            }
            this._checkboxes[callback] = {
                value: checkbox,
                text: text.toUpperCase(),
                button: button
            };
            this.updateCheckboxText(callback);
        } else {
            button.text = text.toUpperCase();
        }
        lastLine.push(button);

        return this;
    }

    private updateCheckboxText(callback: string): void {
        if (this._checkboxes && this._checkboxes[callback]) {
            const config = this._checkboxes[callback];
            config.button.text = (config.value ? '✔' : '❌') + config.text;
        }
    }

    public nextLine(): KeyboardMaker {
        this._keyboard.push([]);

        return this;
    }

    public get result(): InlineKeyboardButton[][] {
        return this._keyboard;
    }

    public get checkboxes(): Checkbox[] {
        const result = [];
        if (this._checkboxes) {
            for (let config in this._checkboxes) {
                result.push({callback: config, value: this._checkboxes[config].value});
            }
        }
        return result;
    }
}