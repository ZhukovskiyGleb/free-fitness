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
    LocId[LocId["DietTarget"] = 9] = "DietTarget";
    LocId[LocId["MealsAmount"] = 10] = "MealsAmount";
    LocId[LocId["ExcludeFood"] = 11] = "ExcludeFood";
    LocId[LocId["DietFormation"] = 12] = "DietFormation";
    LocId[LocId["Breakfast"] = 13] = "Breakfast";
    LocId[LocId["Brunch"] = 14] = "Brunch";
    LocId[LocId["Lunch"] = 15] = "Lunch";
    LocId[LocId["HighTea"] = 16] = "HighTea";
    LocId[LocId["Dinner"] = 17] = "Dinner";
    LocId[LocId["LateDinner"] = 18] = "LateDinner";
    //Profile
    LocId[LocId["ApproveProps"] = 19] = "ApproveProps";
    LocId[LocId["EditWarning"] = 20] = "EditWarning";
    LocId[LocId["EditError"] = 21] = "EditError";
    LocId[LocId["InputIncorrect"] = 22] = "InputIncorrect";
    LocId[LocId["InputWeight"] = 23] = "InputWeight";
    LocId[LocId["InputHeight"] = 24] = "InputHeight";
    LocId[LocId["InputAge"] = 25] = "InputAge";
    LocId[LocId["InputGender"] = 26] = "InputGender";
    LocId[LocId["InputBodyType"] = 27] = "InputBodyType";
    LocId[LocId["InputActivity"] = 28] = "InputActivity";
    LocId[LocId["InputExperience"] = 29] = "InputExperience";
    //Commoon
    LocId[LocId["SaveSuccess"] = 30] = "SaveSuccess";
    //Properties
    LocId[LocId["PropertyWeight"] = 31] = "PropertyWeight";
    LocId[LocId["PropertyHeight"] = 32] = "PropertyHeight";
    LocId[LocId["PropertyAge"] = 33] = "PropertyAge";
    LocId[LocId["PropertyGender"] = 34] = "PropertyGender";
    LocId[LocId["PropertyBodyType"] = 35] = "PropertyBodyType";
    LocId[LocId["PropertyActivity"] = 36] = "PropertyActivity";
    LocId[LocId["PropertyExperience"] = 37] = "PropertyExperience";
    //Property values
    LocId[LocId["GenderMale"] = 38] = "GenderMale";
    LocId[LocId["GenderFemale"] = 39] = "GenderFemale";
    LocId[LocId["BodyTypeThin"] = 40] = "BodyTypeThin";
    LocId[LocId["BodyTypeMuscular"] = 41] = "BodyTypeMuscular";
    LocId[LocId["BodyTypeLarge"] = 42] = "BodyTypeLarge";
    LocId[LocId["BodyTypeOverweight"] = 43] = "BodyTypeOverweight";
    LocId[LocId["BodyTypeCommon"] = 44] = "BodyTypeCommon";
    LocId[LocId["ActivityNothing"] = 45] = "ActivityNothing";
    LocId[LocId["ActivityEasy"] = 46] = "ActivityEasy";
    LocId[LocId["ActivityAverage"] = 47] = "ActivityAverage";
    LocId[LocId["ActivityHeavy"] = 48] = "ActivityHeavy";
    LocId[LocId["ExperienceJunior"] = 49] = "ExperienceJunior";
    LocId[LocId["ExperienceMiddle"] = 50] = "ExperienceMiddle";
    LocId[LocId["ExperienceSenior"] = 51] = "ExperienceSenior";
    LocId[LocId["TargetLoss"] = 52] = "TargetLoss";
    LocId[LocId["TargetSupport"] = 53] = "TargetSupport";
    LocId[LocId["TargetGain"] = 54] = "TargetGain";
    LocId[LocId["FormationVariety"] = 55] = "FormationVariety";
    LocId[LocId["FormationMonotony"] = 56] = "FormationMonotony";
    //Buttons
    LocId[LocId["ButtonDiet"] = 57] = "ButtonDiet";
    LocId[LocId["ButtonWorkout"] = 58] = "ButtonWorkout";
    LocId[LocId["ButtonMyDiet"] = 59] = "ButtonMyDiet";
    LocId[LocId["ButtonNewDiet"] = 60] = "ButtonNewDiet";
    LocId[LocId["ButtonContinue"] = 61] = "ButtonContinue";
    LocId[LocId["ButtonBack"] = 62] = "ButtonBack";
    LocId[LocId["ButtonSave"] = 63] = "ButtonSave";
    LocId[LocId["ButtonApprove"] = 64] = "ButtonApprove";
    LocId[LocId["ButtonEdit"] = 65] = "ButtonEdit";
    //Food
    LocId[LocId["FoodSalmon"] = 66] = "FoodSalmon";
    LocId[LocId["FoodWhiteFish"] = 67] = "FoodWhiteFish";
    LocId[LocId["FoodSeafood"] = 68] = "FoodSeafood";
    LocId[LocId["FoodLeanBeef"] = 69] = "FoodLeanBeef";
    LocId[LocId["FoodLeanPork"] = 70] = "FoodLeanPork";
    LocId[LocId["FoodPoultryLeg"] = 71] = "FoodPoultryLeg";
    LocId[LocId["FoodPoultryFillet"] = 72] = "FoodPoultryFillet";
    LocId[LocId["FoodEgg"] = 73] = "FoodEgg";
    LocId[LocId["FoodEggWhite"] = 74] = "FoodEggWhite";
    LocId[LocId["FoodSoybean"] = 75] = "FoodSoybean";
    LocId[LocId["FoodCheese"] = 76] = "FoodCheese";
    LocId[LocId["FoodSkimCheese"] = 77] = "FoodSkimCheese";
    LocId[LocId["FoodProtein"] = 78] = "FoodProtein";
    LocId[LocId["FoodMassPorridge"] = 79] = "FoodMassPorridge";
    LocId[LocId["FoodBrownRice"] = 80] = "FoodBrownRice";
    LocId[LocId["FoodCouscous"] = 81] = "FoodCouscous";
    LocId[LocId["FoodBuckwheat"] = 82] = "FoodBuckwheat";
    LocId[LocId["FoodOatmeal"] = 83] = "FoodOatmeal";
    LocId[LocId["FoodBreadRolls"] = 84] = "FoodBreadRolls";
    LocId[LocId["FoodBeans"] = 85] = "FoodBeans";
    LocId[LocId["FoodSalad"] = 86] = "FoodSalad";
    LocId[LocId["FoodBerries"] = 87] = "FoodBerries";
    LocId[LocId["FoodDriedFruits"] = 88] = "FoodDriedFruits";
    LocId[LocId["FoodHoney"] = 89] = "FoodHoney";
    LocId[LocId["FoodApple"] = 90] = "FoodApple";
    LocId[LocId["FoodBanana"] = 91] = "FoodBanana";
    LocId[LocId["FoodGrapefruit"] = 92] = "FoodGrapefruit";
    LocId[LocId["FoodKiwi"] = 93] = "FoodKiwi";
    LocId[LocId["FoodNuts"] = 94] = "FoodNuts";
    LocId[LocId["FoodFishOil"] = 95] = "FoodFishOil";
    LocId[LocId["FoodOil"] = 96] = "FoodOil";
    LocId[LocId["FoodAvocado"] = 97] = "FoodAvocado";
    LocId[LocId["FoodTypeMeat"] = 98] = "FoodTypeMeat";
    LocId[LocId["FoodTypePoultry"] = 99] = "FoodTypePoultry";
    LocId[LocId["FoodTypeFish"] = 100] = "FoodTypeFish";
    LocId[LocId["FoodTypeSeafood"] = 101] = "FoodTypeSeafood";
    LocId[LocId["FoodTypeEggs"] = 102] = "FoodTypeEggs";
    LocId[LocId["FoodTypeMilk"] = 103] = "FoodTypeMilk";
    LocId[LocId["FoodTypeFruits"] = 104] = "FoodTypeFruits";
    LocId[LocId["FoodTypeExpensive"] = 105] = "FoodTypeExpensive";
    LocId[LocId["FoodTypeSportNutrition"] = 106] = "FoodTypeSportNutrition";
    //Add
    LocId[LocId["Grams"] = 107] = "Grams";
    LocId[LocId["Piece"] = 108] = "Piece";
    LocId[LocId["Portion"] = 109] = "Portion";
    LocId[LocId["TeaSpoon"] = 110] = "TeaSpoon";
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
            _a[LocId.WhatExactly] = 'Выберите интересующий вас раздел.',
            _a[LocId.DietTarget] = 'Укажите цель рациона:',
            _a[LocId.MealsAmount] = 'Сколько приемов пищи должно быть в рационе (оптимальным количеством является 4-5 приемов):',
            _a[LocId.ExcludeFood] = 'Укажите, какие типы продуктов вы хотите исключить из рациона:',
            _a[LocId.DietFormation] = 'Укажите как составлять рацион:\n' +
                '*Разнообразно* - на каждый прием пищи будут подбираться разные продукты;\n' +
                '*Однотипно* - все приемы пищи будут составлены из одинаковых продуктов.',
            _a[LocId.Breakfast] = '*Завтрак*',
            _a[LocId.Brunch] = '*Второй завтрак*',
            _a[LocId.Lunch] = '*Обед*',
            _a[LocId.HighTea] = '*Полдник*',
            _a[LocId.Dinner] = '*Ужин*',
            _a[LocId.LateDinner] = '*Поздний ужин*',
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
            //Common
            _a[LocId.SaveSuccess] = 'Успешно сохранено.',
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
            _a[LocId.TargetLoss] = 'Похудение',
            _a[LocId.TargetSupport] = 'Поддержание формы',
            _a[LocId.TargetGain] = 'Набор массы',
            _a[LocId.FormationVariety] = 'Разнообразно',
            _a[LocId.FormationMonotony] = 'Однотипно',
            //Buttons
            _a[LocId.ButtonDiet] = 'Питание',
            _a[LocId.ButtonWorkout] = 'Тренировки',
            _a[LocId.ButtonMyDiet] = 'Мой рацион',
            _a[LocId.ButtonNewDiet] = 'Новый рацион',
            _a[LocId.ButtonBack] = 'Назад',
            _a[LocId.ButtonSave] = 'Сохранить',
            _a[LocId.ButtonApprove] = 'Верно',
            _a[LocId.ButtonEdit] = 'Изменить',
            _a[LocId.ButtonContinue] = 'Продолжить',
            //Food
            _a[LocId.FoodSalmon] = 'Семга',
            _a[LocId.FoodWhiteFish] = 'Минтай / Тилапия',
            _a[LocId.FoodSeafood] = 'Мидии / Кальмары',
            _a[LocId.FoodLeanBeef] = 'Постная говядина',
            _a[LocId.FoodLeanPork] = 'Постная свинина',
            _a[LocId.FoodPoultryLeg] = 'Голень курицы / Голень индейки',
            _a[LocId.FoodPoultryFillet] = 'Филе курицы / Филе индейки',
            _a[LocId.FoodEgg] = 'Яйцо',
            _a[LocId.FoodEggWhite] = 'Яичный белок',
            _a[LocId.FoodSoybean] = 'Соевые бобы',
            _a[LocId.FoodCheese] = 'Творог 5% жирности',
            _a[LocId.FoodSkimCheese] = 'Творог нежирный',
            _a[LocId.FoodProtein] = 'Протеин',
            _a[LocId.FoodMassPorridge] = 'Белый рис / Макароны высшего сорта',
            _a[LocId.FoodBrownRice] = 'Бурый рис',
            _a[LocId.FoodCouscous] = 'Кус-кус',
            _a[LocId.FoodBuckwheat] = 'Гречневая каша',
            _a[LocId.FoodOatmeal] = 'Овсяная каша',
            _a[LocId.FoodBreadRolls] = 'Хлебцы',
            _a[LocId.FoodBeans] = 'Нут / Фасоль',
            _a[LocId.FoodSalad] = 'Салат из зеленых овощей',
            _a[LocId.FoodBerries] = 'Ягоды',
            _a[LocId.FoodDriedFruits] = 'Сухофрукты',
            _a[LocId.FoodHoney] = 'Мед',
            _a[LocId.FoodApple] = 'Яблоко',
            _a[LocId.FoodBanana] = 'Банан',
            _a[LocId.FoodGrapefruit] = 'Грейпфрут',
            _a[LocId.FoodKiwi] = 'Киви',
            _a[LocId.FoodNuts] = 'Орехи / Арахисовая паста / Семечки',
            _a[LocId.FoodFishOil] = 'Капсулы рыбьего жира',
            _a[LocId.FoodOil] = 'Оливковое масло / Льняное масло',
            _a[LocId.FoodAvocado] = 'Авокадо',
            _a[LocId.FoodTypeMeat] = 'Мясо',
            _a[LocId.FoodTypePoultry] = 'Птица',
            _a[LocId.FoodTypeFish] = 'Рыба',
            _a[LocId.FoodTypeSeafood] = 'Морепродукты',
            _a[LocId.FoodTypeEggs] = 'Яйца',
            _a[LocId.FoodTypeMilk] = 'Молочные продукты',
            _a[LocId.FoodTypeFruits] = 'Фрукты',
            _a[LocId.FoodTypeExpensive] = 'Дорогие продукты',
            _a[LocId.FoodTypeSportNutrition] = 'Спортивное питание',
            //Add
            _a[LocId.Grams] = 'гр',
            _a[LocId.Piece] = 'шт',
            _a[LocId.Portion] = 'порц',
            _a[LocId.TeaSpoon] = 'ч.л',
            _a)
    };
    return Localization;
}());
exports.Localization = Localization;
