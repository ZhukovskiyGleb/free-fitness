import {Scenario} from "./scenario";
import {LocId, Localization} from "../localization/localization";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../utils/keyboard-maker";
import {DietScenario} from "./diet-scenario";

export class WelcomeScenario extends Scenario {
    private readonly SELECT_STATE = 'WELCOME_SELECT_CALLBACK';
    private readonly DIET_CALLBACK = 'WELCOME_DIET_CALLBACK';
    private readonly WORKOUT_CALLBACK = 'WELCOME_WORKOUT_CALLBACK';

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
                const { callback, userId } = params;

                switch (callback) {
                    case this.DIET_CALLBACK:
                        this._scenarioManager.add(userId, DietScenario, params);

                        return true;
                        break;
                    case this.WORKOUT_CALLBACK:

                        break;
                }

                return false;
            });
    }

    private getWelcomeText(lang: string, datetime: number, name: string, isNewUser: boolean = false): string {
        let locId: LocId;
        if (isNewUser) {
            locId = LocId.NewbieMessage;
        }
        else {
            const curTime = new Date(datetime).getHours();
            locId = [LocId.Welcome, LocId.Hello, LocId.NiceToMeetYouAgain,
            curTime >= 19 ? LocId.GoodEvening :
            curTime >= 10 ? LocId.GoodAfternoon :
            LocId.GoodMorning][Math.floor(Math.random() * 4)];
        }
        return Localization.loc(lang, locId, {name}) + '\n' + Localization.loc(lang, LocId.HowCanIHelp);
    }

    private getSelectKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton(Localization.loc(lang, LocId.ButtonDiet), this.DIET_CALLBACK)
            .addButton(Localization.loc(lang, LocId.ButtonWorkout), this.WORKOUT_CALLBACK)
            .result;
    }

    destroy(): void {

    }
}