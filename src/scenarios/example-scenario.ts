import {KeyboardMarkup, Scenario} from "./scenario";
import {LOC_ID, Localization} from "../localization/localization";

export class ExampleScenario extends Scenario {
    private readonly TEST_DATA = 'TEST_DATA';

    init(): void {

        this.addAction(this.INIT_STATE,
    params => {
                const { chatId, lang, data } = params;
                switch (data) {
                    case this.TEST_DATA:
                        this._bot.sendMessage(
                            chatId,
                            Localization.loc(lang, LOC_ID.Test),
                            true,
                            this.getKeyboard(lang)
                        );

                        break;
                }

                return false;
        });
    }

    private getKeyboard(lang:string): KeyboardMarkup {
        return {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: Localization.loc(lang, LOC_ID.Test),
                        callback_data: this.TEST_DATA
                    }]
                ]
            }
        };
    }

    destroy(): void {

    }
}