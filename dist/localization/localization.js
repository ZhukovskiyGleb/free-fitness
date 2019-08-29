"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var LocId;
(function (LocId) {
    LocId[LocId["NewbieMessage"] = 0] = "NewbieMessage";
    LocId[LocId["GoodMorning"] = 1] = "GoodMorning";
    LocId[LocId["GoodAfternoon"] = 2] = "GoodAfternoon";
    LocId[LocId["GoodEvening"] = 3] = "GoodEvening";
    LocId[LocId["NiceToMeetYouAgain"] = 4] = "NiceToMeetYouAgain";
    LocId[LocId["Welcome"] = 5] = "Welcome";
    LocId[LocId["Hello"] = 6] = "Hello";
    LocId[LocId["HowCanIHelp"] = 7] = "HowCanIHelp";
    LocId[LocId["WhatExactly"] = 8] = "WhatExactly";
    LocId[LocId["ButtonDiet"] = 9] = "ButtonDiet";
    LocId[LocId["ButtonWorkout"] = 10] = "ButtonWorkout";
    LocId[LocId["ButtonMyDiet"] = 11] = "ButtonMyDiet";
    LocId[LocId["ButtonNewDiet"] = 12] = "ButtonNewDiet";
    LocId[LocId["ButtonBackToMenu"] = 13] = "ButtonBackToMenu";
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
            _a[LocId.ButtonDiet] = 'Питание',
            _a[LocId.ButtonWorkout] = 'Тренировки',
            _a[LocId.ButtonMyDiet] = 'Мой рацион',
            _a[LocId.ButtonNewDiet] = 'Новый рацион',
            _a[LocId.ButtonBackToMenu] = 'В главное меню',
            _a)
    };
    return Localization;
}());
exports.Localization = Localization;
