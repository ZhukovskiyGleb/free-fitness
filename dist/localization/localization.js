"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var LOC_ID;
(function (LOC_ID) {
    LOC_ID[LOC_ID["NewbieMessage"] = 0] = "NewbieMessage";
    LOC_ID[LOC_ID["GoodMorning"] = 1] = "GoodMorning";
    LOC_ID[LOC_ID["GoodAfternoon"] = 2] = "GoodAfternoon";
    LOC_ID[LOC_ID["GoodEvening"] = 3] = "GoodEvening";
    LOC_ID[LOC_ID["NiceToMeetYouAgain"] = 4] = "NiceToMeetYouAgain";
    LOC_ID[LOC_ID["Welcome"] = 5] = "Welcome";
    LOC_ID[LOC_ID["Hello"] = 6] = "Hello";
    LOC_ID[LOC_ID["HowCanIHelp"] = 7] = "HowCanIHelp";
    LOC_ID[LOC_ID["ButtonDiet"] = 8] = "ButtonDiet";
    LOC_ID[LOC_ID["ButtonWorkout"] = 9] = "ButtonWorkout";
})(LOC_ID = exports.LOC_ID || (exports.LOC_ID = {}));
var Localization = /** @class */ (function () {
    function Localization() {
    }
    Localization.loc = function (lang, id, keys) {
        if (!this.localizations[lang]) {
            lang = 'ru';
        }
        var text = this.localizations[lang][id];
        if (keys) {
            console.log('parse keys', keys);
            for (var key in keys) {
                console.log('key', key);
                text = text.replace("{" + key + "}", keys[key]);
            }
        }
        return text;
    };
    Localization.localizations = {
        'ru': (_a = {},
            _a[LOC_ID.NewbieMessage] = 'Здравствуйте, {name}!\n' +
                'Я - ваш личный *фитнес тренер и диетолог*!\n' +
                'И совершенно бесплатно, я могу составить для вас рацион питания и программу тренировок.',
            _a[LOC_ID.GoodMorning] = 'Доброе утро, {name}',
            _a[LOC_ID.GoodAfternoon] = 'Добрый день, {name}',
            _a[LOC_ID.GoodEvening] = 'Добрый вечер, {name}',
            _a[LOC_ID.NiceToMeetYouAgain] = 'С возвращением, {name}',
            _a[LOC_ID.Welcome] = 'Добро пожаловать, {name}',
            _a[LOC_ID.Hello] = 'Приветствую, {name}',
            _a[LOC_ID.HowCanIHelp] = 'Чем я могу быть полезен?',
            _a[LOC_ID.ButtonDiet] = 'Питание',
            _a[LOC_ID.ButtonWorkout] = 'Тренировки?',
            _a)
    };
    return Localization;
}());
exports.Localization = Localization;
