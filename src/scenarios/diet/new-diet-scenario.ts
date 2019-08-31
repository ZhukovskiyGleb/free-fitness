import {ActionResults, Scenario} from "../scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../../utils/keyboard-maker";
import {Localization, LocId} from "../../localization/localization";
import {WelcomeScenario} from "../welcome/welcome-scenario";

export class NewDietScenario extends Scenario {
    private readonly NEW_STATE = 'NEW_DIET_NEW_STATE';

    init(): void {

      this.addAction(this.INIT_STATE,
          params => {
              const { callback, chatId, lang, userId } = params;

              this._bot.sendMessage(
                  chatId,
                  'New Diet'
              );

              this.switchToAnotherScenario(userId, WelcomeScenario, params);
              return ActionResults.ReadyForDestroy;
        });
    }

    private getInitKeyboard(lang:string, userId: number): InlineKeyboardButton[][] {
        const keyboard = new KeyboardMaker();
        return keyboard.addButton(Localization.loc(lang, LocId.ButtonNewDiet), 'this.NEW_CALLBACK')
                        .nextLine()
                        .addButton(Localization.loc(lang, LocId.ButtonBack), 'this.BACK_CALLBACK')
                        .result;
    }

    destroy(): void {
        super.destroy();
    }
}