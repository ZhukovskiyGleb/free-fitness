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
    LocId[LocId["InputIncorrect"] = 12] = "InputIncorrect";
    LocId[LocId["InputWeight"] = 13] = "InputWeight";
    LocId[LocId["InputHeight"] = 14] = "InputHeight";
    LocId[LocId["InputAge"] = 15] = "InputAge";
    LocId[LocId["InputGender"] = 16] = "InputGender";
    LocId[LocId["InputBodyType"] = 17] = "InputBodyType";
    LocId[LocId["InputActivity"] = 18] = "InputActivity";
    LocId[LocId["InputExperience"] = 19] = "InputExperience";
    //Properties
    LocId[LocId["PropertyWeight"] = 20] = "PropertyWeight";
    LocId[LocId["PropertyHeight"] = 21] = "PropertyHeight";
    LocId[LocId["PropertyAge"] = 22] = "PropertyAge";
    LocId[LocId["PropertyGender"] = 23] = "PropertyGender";
    LocId[LocId["PropertyBodyType"] = 24] = "PropertyBodyType";
    LocId[LocId["PropertyActivity"] = 25] = "PropertyActivity";
    LocId[LocId["PropertyExperience"] = 26] = "PropertyExperience";
    //Property values
    LocId[LocId["GenderMale"] = 27] = "GenderMale";
    LocId[LocId["GenderFemale"] = 28] = "GenderFemale";
    LocId[LocId["BodyTypeThin"] = 29] = "BodyTypeThin";
    LocId[LocId["BodyTypeMuscular"] = 30] = "BodyTypeMuscular";
    LocId[LocId["BodyTypeLarge"] = 31] = "BodyTypeLarge";
    LocId[LocId["BodyTypeOverweight"] = 32] = "BodyTypeOverweight";
    LocId[LocId["BodyTypeCommon"] = 33] = "BodyTypeCommon";
    LocId[LocId["ActivityNothing"] = 34] = "ActivityNothing";
    LocId[LocId["ActivityEasy"] = 35] = "ActivityEasy";
    LocId[LocId["ActivityAverage"] = 36] = "ActivityAverage";
    LocId[LocId["ActivityHeavy"] = 37] = "ActivityHeavy";
    LocId[LocId["ExperienceJunior"] = 38] = "ExperienceJunior";
    LocId[LocId["ExperienceMiddle"] = 39] = "ExperienceMiddle";
    LocId[LocId["ExperienceSenior"] = 40] = "ExperienceSenior";
    //Buttons
    LocId[LocId["ButtonDiet"] = 41] = "ButtonDiet";
    LocId[LocId["ButtonWorkout"] = 42] = "ButtonWorkout";
    LocId[LocId["ButtonMyDiet"] = 43] = "ButtonMyDiet";
    LocId[LocId["ButtonNewDiet"] = 44] = "ButtonNewDiet";
    LocId[LocId["ButtonContinue"] = 45] = "ButtonContinue";
    LocId[LocId["ButtonBack"] = 46] = "ButtonBack";
    LocId[LocId["ButtonApprove"] = 47] = "ButtonApprove";
    LocId[LocId["ButtonEdit"] = 48] = "ButtonEdit";
    //Food
    LocId[LocId["FoodSalmon"] = 49] = "FoodSalmon";
    LocId[LocId["FoodWhiteFish"] = 50] = "FoodWhiteFish";
    LocId[LocId["FoodSeafood"] = 51] = "FoodSeafood";
    LocId[LocId["FoodLeanBeef"] = 52] = "FoodLeanBeef";
    LocId[LocId["FoodLeanPork"] = 53] = "FoodLeanPork";
    LocId[LocId["FoodPoultryThigh"] = 54] = "FoodPoultryThigh";
    LocId[LocId["FoodPoultryFillet"] = 55] = "FoodPoultryFillet";
    LocId[LocId["FoodEgg"] = 56] = "FoodEgg";
    LocId[LocId["FoodEggWhite"] = 57] = "FoodEggWhite";
    LocId[LocId["FoodSoybean"] = 58] = "FoodSoybean";
    LocId[LocId["FoodCheese"] = 59] = "FoodCheese";
    LocId[LocId["FoodSkimCheese"] = 60] = "FoodSkimCheese";
    LocId[LocId["FoodProtein"] = 61] = "FoodProtein";
    LocId[LocId["FoodMassPorridge"] = 62] = "FoodMassPorridge";
    LocId[LocId["FoodBrownRice"] = 63] = "FoodBrownRice";
    LocId[LocId["FoodBuckwheat"] = 64] = "FoodBuckwheat";
    LocId[LocId["FoodOatmeal"] = 65] = "FoodOatmeal";
    LocId[LocId["FoodBeans"] = 66] = "FoodBeans";
    LocId[LocId["FoodBerries"] = 67] = "FoodBerries";
    LocId[LocId["FoodApple"] = 68] = "FoodApple";
    LocId[LocId["FoodBanana"] = 69] = "FoodBanana";
    LocId[LocId["FoodNuts"] = 70] = "FoodNuts";
    LocId[LocId["FoodFishOil"] = 71] = "FoodFishOil";
    LocId[LocId["FoodOil"] = 72] = "FoodOil";
    LocId[LocId["FoodAvocado"] = 73] = "FoodAvocado";
    //Add
    LocId[LocId["Grams"] = 74] = "Grams";
    LocId[LocId["Piece"] = 75] = "Piece";
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
            //Welcome
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
            //Diet
            _a[LocId.WhatExactly] = 'Что именно интересует?',
            //Profile
            _a[LocId.ApproveProps] = 'Верно ли указаны ваши данные?',
            _a[LocId.EditWarning] = 'Обратите внимание, что повторно изменить свои данные будет возможно только через {days} дней.',
            _a[LocId.EditError] = 'Повторно изменить свои данные будет возможно только через {days} дней.',
            _a[LocId.InputIncorrect] = 'Данные введены неверно. Повторите ввод.',
            _a[LocId.InputWeight] = 'Укажите ваш вес (в килограммах):',
            _a[LocId.InputHeight] = 'Укажите ваш рост (в сантиметрах):',
            _a[LocId.InputAge] = 'Укажите ваш возраст:',
            _a[LocId.InputGender] = 'Укажите ваш пол:',
            _a[LocId.InputActivity] = 'Укажите вашу ежедневную физическую активность:\n' +
                '*Отсутствует* - малоподвижный образ жизни без занятий спортом;\n' +
                '*Легкая* - целый день на ногах или 1-2 тренировки в неделю;\n' +
                '*Средняя* - 3-5 тренировок в неделю;\n' +
                '*Высокая* - 6+ тренировок в неделю.',
            _a[LocId.InputBodyType] = 'Укажите ваше текущее состояние тела:\n' +
                '*Худощавый* - нет ни жира, ни мышц;\n' +
                '*Мускулистый* - спортивное рельефное тело;\n' +
                '*Крупный* - хорошая мышечная масса со слоем жира;\n' +
                '*Полный* - один лишь избыточный вес;\n' +
                '*Обычный* - ничего выше не описывает точно.',
            _a[LocId.InputExperience] = 'Укажите ваш тренировочный стаж:',
            //Properties
            _a[LocId.PropertyWeight] = '- *Вес*: {value} кг',
            _a[LocId.PropertyHeight] = '- *Рост*: {value} см',
            _a[LocId.PropertyAge] = '- *Возраст*: {value}',
            _a[LocId.PropertyGender] = '- *Пол*: {value}',
            _a[LocId.PropertyBodyType] = '- *Телосложение*: {value}',
            _a[LocId.PropertyActivity] = '- *Физическая активность*: {value}',
            _a[LocId.PropertyExperience] = '- *Тренировочный стаж*: {value}',
            //Property values
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
            _a[LocId.ExperienceJunior] = 'Менее 6 месяцев',
            _a[LocId.ExperienceMiddle] = 'До 2 лет',
            _a[LocId.ExperienceSenior] = 'Свыше 2 лет',
            //Buttons
            _a[LocId.ButtonDiet] = 'Питание',
            _a[LocId.ButtonWorkout] = 'Тренировки',
            _a[LocId.ButtonMyDiet] = 'Мой рацион',
            _a[LocId.ButtonNewDiet] = 'Новый рацион',
            _a[LocId.ButtonBack] = 'Назад',
            _a[LocId.ButtonApprove] = 'Верно',
            _a[LocId.ButtonEdit] = 'Изменить',
            _a[LocId.ButtonContinue] = 'Продолжить',
            //Food
            _a[LocId.FoodSalmon] = 'Семга',
            _a[LocId.FoodWhiteFish] = 'Минтай / Тилапия',
            _a[LocId.FoodSeafood] = 'Мидии / Кальмары',
            _a[LocId.FoodLeanBeef] = 'Постная говядина',
            _a[LocId.FoodLeanPork] = 'Постная свинина',
            _a[LocId.FoodPoultryThigh] = 'Бедро курицы / Бедро индейки',
            _a[LocId.FoodPoultryFillet] = 'Филе курицы / Филе индейки',
            _a[LocId.FoodEgg] = 'Яйцо',
            _a[LocId.FoodEggWhite] = 'Яичный белок',
            _a[LocId.FoodSoybean] = 'Соевые бобы',
            _a[LocId.FoodCheese] = 'Творог 5% жирности',
            _a[LocId.FoodSkimCheese] = 'Творог нежирный',
            _a[LocId.FoodProtein] = 'Протеин',
            _a[LocId.FoodMassPorridge] = 'Белый рис / Макароны высшего сорта',
            _a[LocId.FoodBrownRice] = 'Бурый рис',
            _a[LocId.FoodBuckwheat] = 'Гречневая каша',
            _a[LocId.FoodOatmeal] = 'Овсяные хлопья',
            _a[LocId.FoodBeans] = 'Нут / Фасоль',
            _a[LocId.FoodBerries] = 'Ягоды',
            _a[LocId.FoodApple] = 'Яблоко',
            _a[LocId.FoodBanana] = 'Банан',
            _a[LocId.FoodNuts] = 'Орехи / Арахисовая паста / Семечки',
            _a[LocId.FoodFishOil] = 'Капсулы рыбьего жира 2г',
            _a[LocId.FoodOil] = 'Оливковое масло / Льняное масло',
            _a[LocId.FoodAvocado] = 'Авокадо',
            //Add
            _a[LocId.Grams] = 'гр',
            _a[LocId.Piece] = 'шт',
            _a)
    };
    return Localization;
}());
exports.Localization = Localization;
