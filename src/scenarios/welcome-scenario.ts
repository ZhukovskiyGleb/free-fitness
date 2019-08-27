import {Scenario} from "./scenario";
import {LOC_ID, Localization} from "../localization/localization";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../utils/keyboard-maker";

export class WelcomeScenario extends Scenario {
    private readonly SELECT_STATE = 'TEST_CALLBACK';
    private readonly DIET_CALLBACK = 'DIET_CALLBACK';
    private readonly WORKOUT_CALLBACK = 'WORKOUT_CALLBACK';

    init(): void {

        this.addAction(this.INIT_STATE,
    params => {
                const { datetime, chatId, lang, userId, name } = params;

                let user = this._userManager.getUser(userId);

                const isNewUser = !user;

                if (isNewUser) {
                    user = this._userManager.createUser(userId, new Date().getTime());
                }

                if (user) {
                    this._bot.sendMessage(
                        chatId,
                        this.getWelcomeText(lang, datetime!, name!, isNewUser),
                        this.getSelectKeyboard(lang)
                    );

                    this.setState(this.SELECT_STATE);
                }
                else {
                    return true;
                }

                return false;
        });

        this.addAction(this.SELECT_STATE,
            params => {
                const { callback } = params;

                switch (callback) {
                    case this.DIET_CALLBACK:

                        break;
                    case this.WORKOUT_CALLBACK:

                        break;
                }

                return false;
            });
    }

    private getWelcomeText(lang: string, datetime: number, name: string, isNewUser: boolean = false): string {
        let locId: LOC_ID;
        if (isNewUser) {
            locId = LOC_ID.NewbieMessage;
        }
        else {
            const curTime = new Date(datetime).getHours();
            locId = [LOC_ID.Welcome, LOC_ID.Hello, LOC_ID.NiceToMeetYouAgain,
            curTime >= 19 ? LOC_ID.GoodEvening :
            curTime >= 10 ? LOC_ID.GoodAfternoon :
            LOC_ID.GoodMorning][Math.floor(Math.random() * 4)];
        }
        return Localization.loc(lang, locId, {name}) + '\n' + Localization.loc(lang, LOC_ID.HowCanIHelp);
    }

    private getSelectKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton(Localization.loc(lang, LOC_ID.ButtonDiet), this.DIET_CALLBACK)
            .addButton(Localization.loc(lang, LOC_ID.ButtonWorkout), this.WORKOUT_CALLBACK)
            .result;
    }

    destroy(): void {

    }
}