"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var LocId;
(function (LocId) {
    //Welcome
    LocId[LocId["NewbieMessage"] = 0] = "NewbieMessage";
    LocId[LocId["GoodMorning"] = 1] = "GoodMorning";
    LocId[LocId["GoodAfternoon"] = 2] = "GoodAfternoon";
    LocId[LocId["GoodEvening"] = 3] = "GoodEvening";
    LocId[LocId["NiceToMeetYouAgain"] = 4] = "NiceToMeetYouAgain";
    LocId[LocId["Welcome"] = 5] = "Welcome";
    LocId[LocId["Hello"] = 6] = "Hello";
    LocId[LocId["HowCanIHelp"] = 7] = "HowCanIHelp";
    //Diet
    LocId[LocId["WhatExactly"] = 8] = "WhatExactly";
    //Profile
    LocId[LocId["ApproveProps"] = 9] = "ApproveProps";
    LocId[LocId["EditWarning"] = 10] = "EditWarning";
    LocId[LocId["EditError"] = 11] = "EditError";
    //Properties
    LocId[LocId["PropertyWeight"] = 12] = "PropertyWeight";
    LocId[LocId["PropertyHeight"] = 13] = "PropertyHeight";
    LocId[LocId["PropertyAge"] = 14] = "PropertyAge";
    LocId[LocId["PropertyGender"] = 15] = "PropertyGender";
    LocId[LocId["PropertyBodyType"] = 16] = "PropertyBodyType";
    LocId[LocId["PropertyActivity"] = 17] = "PropertyActivity";
    LocId[LocId["PropertyExperience"] = 18] = "PropertyExperience";
    LocId[LocId["GenderMale"] = 19] = "GenderMale";
    LocId[LocId["GenderFemale"] = 20] = "GenderFemale";
    LocId[LocId["BodyTypeThin"] = 21] = "BodyTypeThin";
    LocId[LocId["BodyTypeMuscular"] = 22] = "BodyTypeMuscular";
    LocId[LocId["BodyTypeLarge"] = 23] = "BodyTypeLarge";
    LocId[LocId["BodyTypeOverweight"] = 24] = "BodyTypeOverweight";
    LocId[LocId["BodyTypeCommon"] = 25] = "BodyTypeCommon";
    LocId[LocId["ActivityNothing"] = 26] = "ActivityNothing";
    LocId[LocId["ActivityEasy"] = 27] = "ActivityEasy";
    LocId[LocId["ActivityAverage"] = 28] = "ActivityAverage";
    LocId[LocId["ActivityHeavy"] = 29] = "ActivityHeavy";
    LocId[LocId["ExperienceJunior"] = 30] = "ExperienceJunior";
    LocId[LocId["ExperienceMiddle"] = 31] = "ExperienceMiddle";
    LocId[LocId["ExperienceSenior"] = 32] = "ExperienceSenior";
    //Buttons
    LocId[LocId["ButtonDiet"] = 33] = "ButtonDiet";
    LocId[LocId["ButtonWorkout"] = 34] = "ButtonWorkout";
    LocId[LocId["ButtonMyDiet"] = 35] = "ButtonMyDiet";
    LocId[LocId["ButtonNewDiet"] = 36] = "ButtonNewDiet";
    LocId[LocId["ButtonBack"] = 37] = "ButtonBack";
    LocId[LocId["ButtonApprove"] = 38] = "ButtonApprove";
    LocId[LocId["ButtonEdit"] = 39] = "ButtonEdit";
})(LocId = exports.LocId || (exports.LocId = {}));
var Localization = /** @class */ (function () {
    function Localization() {
    }
    Localization.loc = function (lang, id, keys) {
        if (!this.localizations[lang]) {
            lang = 'ru';
        }
        var text = this.localizations[lang][id];
        if (keys) {
            for (var key in keys) {
                text = text.replace("{" + key + "}", keys[key]);
            }
        }
        return text;
    };
    Localization.localizations = {
        'ru': (_a = {},
            _a[LocId.NewbieMessage] = 'Здравствуйте, {name}!\n' +
                'Я - ваш личный *фитнес тренер и диетолог*!\n' +
                'И совершенно бесплатно, я могу составить для вас рацион питания и программу тренировок.',
            _a[LocId.GoodMorning] = 'Доброе утро, {name}',
            _a[LocId.GoodAfternoon] = 'Добрый день, {name}',
            _a[LocId.GoodEvening] = 'Добрый вечер, {name}',
            _a[LocId.NiceToMeetYouAgain] = 'С возвращением, {name}',
            _a[LocId.Welcome] = 'Добро пожаловать, {name}',
            _a[LocId.Hello] = 'Приветствую, {name}',
            _a[LocId.HowCanIHelp] = 'Чем я могу быть полезен?',
            _a[LocId.WhatExactly] = 'Что именно интересует?',
            _a[LocId.ApproveProps] = 'Верно ли указаны ваши данные:',
            _a[LocId.EditWarning] = 'Обратите внимание, что повторно изменить свои данные будет возможно только через {days} дней.',
            _a[LocId.EditError] = 'Повторно изменить свои данные будет возможно только через {days} дней.',
            _a[LocId.ButtonDiet] = 'Питание',
            _a[LocId.ButtonWorkout] = 'Тренировки',
            _a[LocId.ButtonMyDiet] = 'Мой рацион',
            _a[LocId.ButtonNewDiet] = 'Новый рацион',
            _a[LocId.ButtonBack] = 'Назад',
            _a[LocId.ButtonApprove] = 'Верно',
            _a[LocId.ButtonEdit] = 'Изменить',
            _a[LocId.PropertyWeight] = '- *Вес*: {value}',
            _a[LocId.PropertyHeight] = '- *Рост*: {value}',
            _a[LocId.PropertyAge] = '- *Возраст*: {value}',
            _a[LocId.PropertyGender] = '- *Пол*: {value}',
            _a[LocId.PropertyBodyType] = '- *Телосложение*: {value}',
            _a[LocId.PropertyActivity] = '- *Физическая активность*: {value}',
            _a[LocId.PropertyExperience] = '- *Тренировочный стаж*: {value}',
            _a[LocId.GenderMale] = 'Мужской',
            _a[LocId.GenderFemale] = 'Женский',
            _a[LocId.BodyTypeThin] = 'Худощавый',
            _a[LocId.BodyTypeMuscular] = 'Мускулистый',
            _a[LocId.BodyTypeLarge] = 'Крупный',
            _a[LocId.BodyTypeOverweight] = 'Полный',
            _a[LocId.BodyTypeCommon] = 'Обычный',
            _a[LocId.ActivityNothing] = 'Отсутствует',
            _a[LocId.ActivityEasy] = 'Легкая',
            _a[LocId.ActivityAverage] = 'Средняя',
            _a[LocId.ActivityHeavy] = 'Высокая',
            _a[LocId.ExperienceJunior] = 'Новичок',
            _a[LocId.ExperienceMiddle] = 'Опытный',
            _a[LocId.ExperienceSenior] = 'Профи',
            _a)
    };
    return Localization;
}());
exports.Localization = Localization;
