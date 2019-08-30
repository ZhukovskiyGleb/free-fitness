import {ActionResults, Scenario} from "../scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../../utils/keyboard-maker";
import {UserProperty} from "../../user/user";
import {Localization, LocId} from "../../localization/localization";
import {WelcomeScenario} from "../welcome/welcome-scenario";
import {ProfileScenario} from "../profile/profile-scenario";
import {isSomething} from "../../utils/utils";
import {NewDietScenario} from "./new-diet-scenario";

export class DietScenario extends Scenario {
    private readonly NEW_STATE = 'DIET_NEW_STATE';

    private readonly PROFILE_READY_CALLBACK = 'DIET_PROFILE_READY_CALLBACK';
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
                    return ActionResults.Repeat;
                case this.BACK_CALLBACK:
                    this.switchToAnotherScenario(userId, WelcomeScenario, params);
                    return ActionResults.ReadyForDestroy;
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
                const { callback, userId } = params;

                if (callback === this.PROFILE_READY_CALLBACK) {
                    this.switchToAnotherScenario(userId, NewDietScenario, params);
                    return ActionResults.ReadyForDestroy;
                } else {
                    this.waitForScenario(params, ProfileScenario, {
                        callback: this.PROFILE_READY_CALLBACK,
                        data: [UserProperty.Height, UserProperty.Weight, UserProperty.BodyType, UserProperty.Activity]
                    });
                }
        });
    }

    private getInitKeyboard(lang:string, userId: number): InlineKeyboardButton[][] {
        const keyboard = new KeyboardMaker();
        const user = this._userManager.getUser(userId);
        if (user && isSomething(user.getProperty(UserProperty.SavedDiet))) {
            keyboard.addButton(Localization.loc(lang, LocId.ButtonMyDiet), this.LOAD_CALLBACK);
        }
        return keyboard.addButton(Localization.loc(lang, LocId.ButtonNewDiet), this.NEW_CALLBACK)
                        .nextLine()
                        .addButton(Localization.loc(lang, LocId.ButtonBack), this.BACK_CALLBACK)
                        .result;
    }

    destroy(): void {
        super.destroy();
    }
}