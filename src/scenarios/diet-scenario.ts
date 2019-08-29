import {Scenario} from "./scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../utils/keyboard-maker";
import {UserProperty} from "../user/user";
import {Localization, LocId} from "../localization/localization";

export class DietScenario extends Scenario {
    private readonly NEW_STATE = 'DIET_NEW_STATE';

    private readonly WAIT_PROFILE_CALLBACK = 'WAIT_PROFILE_CALLBACK';
    private readonly LOAD_CALLBACK = 'DIET_LOAD_CALLBACK';
    private readonly NEW_CALLBACK = 'DIET_NEW_CALLBACK';
    private readonly BACK_CALLBACK = 'DIET_BACK_CALLBACK';

    init(): void {

      this.addAction(this.INIT_STATE,
          params => {
            const { callback, chatId, lang, userId } = params;

            switch (callback) {
                case this.LOAD_CALLBACK:

                    break;
                case this.NEW_CALLBACK:
                    this.setState(this.NEW_STATE);

                    return {repeat: true};

                    break;
                case this.BACK_CALLBACK:

                    break;
                default:
                    this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.WhatExactly),
                        this.getInitKeyboard(lang, userId)
                    );

                    break;
            }
        });

        this.addAction(this.NEW_STATE,
    params => {
                const { userId } = params;

                const user = this._userManager.getUser(userId);

                if (user) {
                    if (user.hasProperties([UserProperty.Height, UserProperty.Weight, UserProperty.BodyType, UserProperty.Activity])) {
                        const { height, weight, bodyType, activity } = user.properties;

                    } else {
                        // this.waitForScenario(params, )
                    }
                }
                else {
                    return true;
                }

                return false;
        });
    }

    private getInitKeyboard(lang:string, userId: number): InlineKeyboardButton[][] {
        const keyboard = new KeyboardMaker();
        const user = this._userManager.getUser(userId);
        if (user && !!user.getProperty(UserProperty.SavedDiet)) {
            keyboard.addButton(Localization.loc(lang, LocId.ButtonDiet), this.LOAD_CALLBACK);
        }
        return keyboard.addButton(Localization.loc(lang, LocId.ButtonDiet), this.NEW_CALLBACK)
                        .addButton(Localization.loc(lang, LocId.ButtonWorkout), this.BACK_CALLBACK)
                        .result;
    }

    destroy(): void {

    }
}