import {strict} from "assert";

export enum LocId {
    NewbieMessage,
    GoodMorning,
    GoodAfternoon,
    GoodEvening,
    NiceToMeetYouAgain,
    Welcome,
    Hello,
    HowCanIHelp,
    ButtonDiet,
    ButtonWorkout,
}

export class Localization<T extends keyof LocId> {
    private static localizations: { [key: string]: {[key in LocId]: string} } = {
        'ru': {
            [LocId.NewbieMessage]: 'Здравствуйте, {name}!\n' +
            'Я - ваш личный *фитнес тренер и диетолог*!\n' +
            'И совершенно бесплатно, я могу составить для вас рацион питания и программу тренировок.',
            [LocId.GoodMorning]: 'Доброе утро, {name}',
            [LocId.GoodAfternoon]: 'Добрый день, {name}',
            [LocId.GoodEvening]: 'Добрый вечер, {name}',
            [LocId.NiceToMeetYouAgain]: 'С возвращением, {name}',
            [LocId.Welcome]: 'Добро пожаловать, {name}',
            [LocId.Hello]: 'Приветствую, {name}',
            [LocId.HowCanIHelp]: 'Чем я могу быть полезен?',
            [LocId.ButtonDiet]: 'Питание',
            [LocId.ButtonWorkout]: 'Тренировки',
        }
    };

    public static loc(lang: string, id: LocId, keys?: {[key: string]: string}): string {
        if (!this.localizations[lang]) {
            lang = 'ru';
        }
        let text = this.localizations[lang][id];

        if (keys) {
            for (let key in keys) {
                text = text.replace(`{${key}}`, keys[key]);
            }
        }

        return text;
    }
}