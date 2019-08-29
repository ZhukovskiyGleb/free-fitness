import {strict} from "assert";

export enum LocId {
    //Welcome
    NewbieMessage,
    GoodMorning,
    GoodAfternoon,
    GoodEvening,
    NiceToMeetYouAgain,
    Welcome,
    Hello,
    HowCanIHelp,
    //Diet
    WhatExactly,
    //Profile
    ApproveProps,
    EditWarning,
    EditError,
    //Properties
    PropertyWeight,
    PropertyHeight,
    PropertyAge,
    PropertyGender,
    PropertyBodyType,
    PropertyActivity,
    PropertyExperience,
    GenderMale,
    GenderFemale,
    BodyTypeThin,
    BodyTypeMuscular,
    BodyTypeLarge,
    BodyTypeOverweight,
    BodyTypeCommon,
    ActivityNothing,
    ActivityEasy,
    ActivityAverage,
    ActivityHeavy,
    ExperienceJunior,
    ExperienceMiddle,
    ExperienceSenior,
    //Buttons
    ButtonDiet,
    ButtonWorkout,
    ButtonMyDiet,
    ButtonNewDiet,
    ButtonContinue,
    ButtonBack,
    ButtonApprove,
    ButtonEdit,
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
            [LocId.WhatExactly]: 'Что именно интересует?',
            [LocId.ApproveProps]: 'Верно ли указаны ваши данные:',
            [LocId.EditWarning]: 'Обратите внимание, что повторно изменить свои данные будет возможно только через {days} дней.',
            [LocId.EditError]: 'Повторно изменить свои данные будет возможно только через {days} дней.',
            [LocId.ButtonDiet]: 'Питание',
            [LocId.ButtonWorkout]: 'Тренировки',
            [LocId.ButtonMyDiet]: 'Мой рацион',
            [LocId.ButtonNewDiet]: 'Новый рацион',
            [LocId.ButtonBack]: 'Назад',
            [LocId.ButtonApprove]: 'Верно',
            [LocId.ButtonEdit]: 'Изменить',
            [LocId.ButtonContinue]: 'Продолжить',
            [LocId.PropertyWeight]: '- *Вес*: {value}',
            [LocId.PropertyHeight]: '- *Рост*: {value}',
            [LocId.PropertyAge]: '- *Возраст*: {value}',
            [LocId.PropertyGender]: '- *Пол*: {value}',
            [LocId.PropertyBodyType]: '- *Телосложение*: {value}',
            [LocId.PropertyActivity]: '- *Физическая активность*: {value}',
            [LocId.PropertyExperience]: '- *Тренировочный стаж*: {value}',
            [LocId.GenderMale]: 'Мужской',
            [LocId.GenderFemale]: 'Женский',
            [LocId.BodyTypeThin]: 'Худощавый',
            [LocId.BodyTypeMuscular]: 'Мускулистый',
            [LocId.BodyTypeLarge]: 'Крупный',
            [LocId.BodyTypeOverweight]: 'Полный',
            [LocId.BodyTypeCommon]: 'Обычный',
            [LocId.ActivityNothing]: 'Отсутствует',
            [LocId.ActivityEasy]: 'Легкая',
            [LocId.ActivityAverage]: 'Средняя',
            [LocId.ActivityHeavy]: 'Высокая',
            [LocId.ExperienceJunior]: 'Новичок',
            [LocId.ExperienceMiddle]: 'Опытный',
            [LocId.ExperienceSenior]: 'Профи',
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