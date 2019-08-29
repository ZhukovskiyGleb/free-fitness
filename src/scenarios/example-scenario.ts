import {Scenario} from "./scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../utils/keyboard-maker";

export class ExampleScenario extends Scenario {
    private readonly TEST_CALLBACK = 'TEST_CALLBACK';

    init(): void {

        this.addAction(this.INIT_STATE,
    params => {
                const { chatId, lang, callback } = params;
                switch (callback) {
                    case this.TEST_CALLBACK:
                        this._bot.sendMessage(
                            chatId,
                            'Localization.loc(lang, LOC_ID.Test)',
                            this.getKeyboard(lang)
                        );

                        break;
                    default:
                        this._bot.sendMessage(
                            chatId,
                            'Localization.loc(lang, LOC_ID.Test2)',
                            this.getKeyboard(lang)
                        );

                        break;
                }
        });
    }

    private getKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton('Localization.loc(lang, LOC_ID.Test)', this.TEST_CALLBACK)
            .result;
    }

    destroy(): void {

    }
}