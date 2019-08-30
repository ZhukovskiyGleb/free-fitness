import {ActionResults, Scenario} from "../scenario";
import {Localization, LocId} from "../../localization/localization";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../../utils/keyboard-maker";
import {DietScenario} from "../diet/diet-scenario";
import {UserProperty} from "../../user/user";
import {getHoursPast} from "../../utils/utils";
import {Config} from "../configs/config";

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
                        this.getWelcomeText(lang, datetime!, name!, user.getProperty(UserProperty.LastVisitDate), isNewUser),
                        this.getSelectKeyboard(lang)
                    );

                    user.setProperty(UserProperty.LastVisitDate, new Date().getTime());

                    this.setState(this.SELECT_STATE);
                }
                else {
                    return ActionResults.ReadyForDestroy;
                }
        });

        this.addAction(this.SELECT_STATE,
            params => {
                const { callback, userId } = params;

                switch (callback) {
                    case this.DIET_CALLBACK:
                        this.switchToAnotherScenario(userId, DietScenario, params);

                        return ActionResults.ReadyForDestroy;
                        break;
                    case this.WORKOUT_CALLBACK:

                        break;
                }
            });
    }

    private getWelcomeText(lang: string, datetime: number, name: string, lastVisitDate?: number, isNewUser: boolean = false): string {
        let messageHeader = '';
        if (isNewUser) {
            messageHeader = Localization.loc(lang, LocId.NewbieMessage, {name});
        }
        else {
            let pastHours = 0;
            if (lastVisitDate) {
                pastHours = getHoursPast(lastVisitDate, Config.hoursBeforeGreeting);
                if (pastHours > 0) {
                    const curDate = new Date();
                    const lastDate = new Date(lastVisitDate);
                    if (curDate.getDate() !== lastDate.getDate()) {
                      pastHours = 0;
                    }
                }
            }

            if (pastHours === 0) {
                const curTime = new Date(datetime).getHours();
                const locId = [LocId.Welcome, LocId.Hello, LocId.NiceToMeetYouAgain,
                    curTime >= 19 ? LocId.GoodEvening :
                        curTime >= 10 ? LocId.GoodAfternoon :
                            LocId.GoodMorning][Math.floor(Math.random() * 4)];

                messageHeader = Localization.loc(lang, locId, {name});
            }
        }
        if (messageHeader.length > 0) {
            messageHeader += '\n';
        }
        return messageHeader + '\n' + Localization.loc(lang, LocId.HowCanIHelp);
    }

    private getSelectKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton(Localization.loc(lang, LocId.ButtonDiet), this.DIET_CALLBACK)
            .addButton(Localization.loc(lang, LocId.ButtonWorkout), this.WORKOUT_CALLBACK)
            .result;
    }

    destroy(): void {
        super.destroy();
    }
}