import {Scenario} from "./scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../utils/keyboard-maker";
import {UserProperty} from "../user/user";

export class DietScenario extends Scenario {
    private readonly WAIT_CALLBACK = 'DIET_WAIT_CALLBACK';

    init(): void {

        this.addAction(this.INIT_STATE,
    params => {
                const { datetime, chatId, lang, userId, name } = params;

                const user = this._userManager.getUser(userId);

                if (user) {
                    if (user.hasProperties([UserProperty.Height, UserProperty.Weight, UserProperty.BodyType, UserProperty.Activity])) {
                        const { height, weight, bodyType, activity } = user.properties;

                    } else {

                    }
                }
                else {
                    return true;
                }

                return false;
        });
    }

    // private getWelcomeText(lang: string, datetime: number, name: string, isNewUser: boolean = false): string {
    //     let locId: LocId;
    //     if (isNewUser) {
    //         locId = LocId.NewbieMessage;
    //     }
    //     else {
    //         const curTime = new Date(datetime).getHours();
    //         locId = [LocId.Welcome, LocId.Hello, LocId.NiceToMeetYouAgain,
    //         curTime >= 19 ? LocId.GoodEvening :
    //         curTime >= 10 ? LocId.GoodAfternoon :
    //         LocId.GoodMorning][Math.floor(Math.random() * 4)];
    //     }
    //     return Localization.loc(lang, locId, {name}) + '\n' + Localization.loc(lang, LocId.HowCanIHelp);
    // }

    private getSelectKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            // .addButton(Localization.loc(lang, LocId.ButtonDiet), this.DIET_CALLBACK)
            // .addButton(Localization.loc(lang, LocId.ButtonWorkout), this.WORKOUT_CALLBACK)
            .result;
    }

    destroy(): void {

    }
}