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
    DietTarget,
    MealsAmount,
    ExcludeFood,
    DietFormation,
    Breakfast,
    Brunch,
    Lunch,
    HighTea,
    Dinner,
    LateDinner,
    //Profile
    ApproveProps,
    EditWarning,
    EditError,
    InputIncorrect,
    InputWeight,
    InputHeight,
    InputAge,
    InputGender,
    InputBodyType,
    InputActivity,
    InputExperience,
    //Commoon
    SaveSuccess,
    //Properties
    PropertyWeight,
    PropertyHeight,
    PropertyAge,
    PropertyGender,
    PropertyBodyType,
    PropertyActivity,
    PropertyExperience,
    //Property values
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
    TargetLoss,
    TargetSupport,
    TargetGain,
    FormationVariety,
    FormationMonotony,
    //Buttons
    ButtonDiet,
    ButtonWorkout,
    ButtonMyDiet,
    ButtonNewDiet,
    ButtonContinue,
    ButtonBack,
    ButtonSave,
    ButtonApprove,
    ButtonEdit,
    //Food
    FoodSalmon,
    FoodWhiteFish,
    FoodSeafood,
    FoodLeanBeef,
    FoodLeanPork,
    FoodPoultryLeg,
    FoodPoultryFillet,
    FoodEgg,
    FoodEggWhite,
    FoodSoybean,
    FoodCheese,
    FoodSkimCheese,
    FoodProtein,
    FoodMassPorridge,
    FoodBrownRice,
    FoodCouscous,
    FoodBuckwheat,
    FoodOatmeal,
    FoodBreadRolls,
    FoodBeans,
    FoodSalad,
    FoodBerries,
    FoodDriedFruits,
    FoodHoney,
    FoodApple,
    FoodBanana,
    FoodGrapefruit,
    FoodKiwi,
    FoodNuts,
    FoodFishOil,
    FoodOil,
    FoodAvocado,
    FoodTypeMeat,
    FoodTypePoultry,
    FoodTypeFish,
    FoodTypeSeafood,
    FoodTypeEggs,
    FoodTypeMilk,
    FoodTypeFruits,
    FoodTypeExpensive,
    FoodTypeSportNutrition,
    //Add
    Grams,
    Piece,
    Portion,
    TeaSpoon,
}

export class Localization<T extends keyof LocId> {
    private static localizations: { [key: string]: {[key in LocId]: string} } = {
        'ru': {
            //Welcome
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
            //Diet
            [LocId.WhatExactly]: 'Выберите интересующий вас раздел.',
            [LocId.DietTarget]: 'Укажите цель рациона:',
            [LocId.MealsAmount]: 'Сколько приемов пищи должно быть в рационе (оптимальным количеством является 4-5 приемов):',
            [LocId.ExcludeFood]: 'Укажите, какие типы продуктов вы хотите исключить из рациона:',
            [LocId.DietFormation]: 'Укажите как составлять рацион:\n' +
            '*Разнообразно* - на каждый прием пищи будут подбираться разные продукты;\n' +
            '*Однотипно* - все приемы пищи будут составлены из одинаковых продуктов.',
            [LocId.Breakfast]: '*Завтрак*',
            [LocId.Brunch]: '*Второй завтрак*',
            [LocId.Lunch]: '*Обед*',
            [LocId.HighTea]: '*Полдник*',
            [LocId.Dinner]: '*Ужин*',
            [LocId.LateDinner]: '*Поздний ужин*',
            //Profile
            [LocId.ApproveProps]: 'Верно ли указаны ваши данные?',
            [LocId.EditWarning]: 'Обратите внимание, что повторно изменить свои данные будет возможно только через {days} дней.',
            [LocId.EditError]: 'Повторно изменить свои данные будет возможно только через {days} дней.',
            [LocId.InputIncorrect]: 'Данные введены неверно. Повторите ввод.',
            [LocId.InputWeight]: 'Укажите ваш вес (в килограммах):',
            [LocId.InputHeight]: 'Укажите ваш рост (в сантиметрах):',
            [LocId.InputAge]: 'Укажите ваш возраст:',
            [LocId.InputGender]: 'Укажите ваш пол:',
            [LocId.InputActivity]: 'Укажите вашу ежедневную физическую активность:\n' +
            '*Отсутствует* - малоподвижный образ жизни без занятий спортом;\n' +
            '*Легкая* - целый день на ногах или 1-2 тренировки в неделю;\n' +
            '*Средняя* - 3-5 тренировок в неделю;\n' +
            '*Высокая* - 6+ тренировок в неделю.',
            [LocId.InputBodyType]: 'Укажите ваше текущее состояние тела:\n' +
            '*Худощавый* - нет ни жира, ни мышц;\n' +
            '*Мускулистый* - спортивное рельефное тело;\n' +
            '*Крупный* - хорошая мышечная масса со слоем жира;\n' +
            '*Полный* - один лишь избыточный вес;\n' +
            '*Обычный* - ничего выше не описывает точно.',
            [LocId.InputExperience]: 'Укажите ваш тренировочный стаж:',
            //Common
            [LocId.SaveSuccess]: 'Успешно сохранено.',
            //Properties
            [LocId.PropertyWeight]: '- *Вес*: {value} кг',
            [LocId.PropertyHeight]: '- *Рост*: {value} см',
            [LocId.PropertyAge]: '- *Возраст*: {value}',
            [LocId.PropertyGender]: '- *Пол*: {value}',
            [LocId.PropertyBodyType]: '- *Телосложение*: {value}',
            [LocId.PropertyActivity]: '- *Физическая активность*: {value}',
            [LocId.PropertyExperience]: '- *Тренировочный стаж*: {value}',
            //Property values
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
            [LocId.ExperienceJunior]: 'Менее 6 месяцев',
            [LocId.ExperienceMiddle]: 'До 2 лет',
            [LocId.ExperienceSenior]: 'Свыше 2 лет',
            [LocId.TargetLoss]: 'Похудение',
            [LocId.TargetSupport]: 'Поддержание формы',
            [LocId.TargetGain]: 'Набор массы',
            [LocId.FormationVariety]: 'Разнообразно',
            [LocId.FormationMonotony]: 'Однотипно',
            //Buttons
            [LocId.ButtonDiet]: 'Питание',
            [LocId.ButtonWorkout]: 'Тренировки',
            [LocId.ButtonMyDiet]: 'Мой рацион',
            [LocId.ButtonNewDiet]: 'Новый рацион',
            [LocId.ButtonBack]: 'Назад',
            [LocId.ButtonSave]: 'Сохранить',
            [LocId.ButtonApprove]: 'Верно',
            [LocId.ButtonEdit]: 'Изменить',
            [LocId.ButtonContinue]: 'Продолжить',
            //Food
            [LocId.FoodSalmon]: 'Семга',
            [LocId.FoodWhiteFish]: 'Минтай / Тилапия',
            [LocId.FoodSeafood]: 'Мидии / Кальмары',
            [LocId.FoodLeanBeef]: 'Постная говядина',
            [LocId.FoodLeanPork]: 'Постная свинина',
            [LocId.FoodPoultryLeg]: 'Голень курицы / Голень индейки',
            [LocId.FoodPoultryFillet]: 'Филе курицы / Филе индейки',
            [LocId.FoodEgg]: 'Яйцо',
            [LocId.FoodEggWhite]: 'Яичный белок',
            [LocId.FoodSoybean]: 'Соевые бобы',
            [LocId.FoodCheese]: 'Творог 5% жирности',
            [LocId.FoodSkimCheese]: 'Творог нежирный',
            [LocId.FoodProtein]: 'Протеин',
            [LocId.FoodMassPorridge]: 'Белый рис / Макароны высшего сорта',
            [LocId.FoodBrownRice]: 'Бурый рис',
            [LocId.FoodCouscous]: 'Кус-кус',
            [LocId.FoodBuckwheat]: 'Гречневая каша',
            [LocId.FoodOatmeal]: 'Овсяная каша',
            [LocId.FoodBreadRolls]: 'Хлебцы',
            [LocId.FoodBeans]: 'Нут / Фасоль',
            [LocId.FoodSalad]: 'Салат из зеленых овощей',
            [LocId.FoodBerries]: 'Ягоды',
            [LocId.FoodDriedFruits]: 'Сухофрукты',
            [LocId.FoodHoney]: 'Мед',
            [LocId.FoodApple]: 'Яблоко',
            [LocId.FoodBanana]: 'Банан',
            [LocId.FoodGrapefruit]: 'Грейпфрут',
            [LocId.FoodKiwi]: 'Киви',
            [LocId.FoodNuts]: 'Орехи / Арахисовая паста / Семечки',
            [LocId.FoodFishOil]: 'Капсулы рыбьего жира',
            [LocId.FoodOil]: 'Оливковое масло / Льняное масло',
            [LocId.FoodAvocado]: 'Авокадо',
            [LocId.FoodTypeMeat]: 'Мясо',
            [LocId.FoodTypePoultry]: 'Птица',
            [LocId.FoodTypeFish]: 'Рыба',
            [LocId.FoodTypeSeafood]: 'Морепродукты',
            [LocId.FoodTypeEggs]: 'Яйца',
            [LocId.FoodTypeMilk]: 'Молочные продукты',
            [LocId.FoodTypeFruits]: 'Фрукты',
            [LocId.FoodTypeExpensive]: 'Дорогие продукты',
            [LocId.FoodTypeSportNutrition]: 'Спортивное питание',
            //Add
            [LocId.Grams]: 'гр',
            [LocId.Piece]: 'шт',
            [LocId.Portion]: 'порц',
            [LocId.TeaSpoon]: 'ч.л',
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