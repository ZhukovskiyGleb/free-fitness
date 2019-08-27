import {strict} from "assert";

export enum LOC_ID {
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

export class Localization<T extends keyof LOC_ID> {
    private static localizations: { [key: string]: {[key in LOC_ID]: string} } = {
        'ru': {
            [LOC_ID.NewbieMessage]: 'Здравствуйте, {name}!\n' +
            'Я - ваш личный *фитнес тренер и диетолог*!\n' +
            'И совершенно бесплатно, я могу составить для вас рацион питания и программу тренировок.',
            [LOC_ID.GoodMorning]: 'Доброе утро, {name}',
            [LOC_ID.GoodAfternoon]: 'Добрый день, {name}',
            [LOC_ID.GoodEvening]: 'Добрый вечер, {name}',
            [LOC_ID.NiceToMeetYouAgain]: 'С возвращением, {name}',
            [LOC_ID.Welcome]: 'Добро пожаловать, {name}',
            [LOC_ID.Hello]: 'Приветствую, {name}',
            [LOC_ID.HowCanIHelp]: 'Чем я могу быть полезен?',
            [LOC_ID.ButtonDiet]: 'Питание',
            [LOC_ID.ButtonWorkout]: 'Тренировки',
        }
    };

    public static loc(lang: string, id: LOC_ID, keys?: {[key: string]: string}): string {
        if (!this.localizations[lang]) {
            lang = 'ru';
        }
        let text = this.localizations[lang][id];

        if (keys) {
            console.log('parse keys', keys);
            for (let key in keys) {
                console.log('key', key);
                text = text.replace(`{${key}}`, keys[key]);
            }
        }

        return text;
    }
}