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
    //Exercises
    BarbellSquats,
    SmithSquats,
    LegPress,
    OneLegPress,
    LegExtension,
    OneLegExtension,
    SmithLunge,
    DumbbellLunge,
    DumbbellRomanianDeadLift,
    BarbellRomanianDeadLift,
    LyingLegCurl,
    SeatedLegCurl,
    CloseGripCablePullDown,
    WideGripCablePullDown,
    PullUps,
    BentOverBarbellRow,
    TBarRowRow,
    CableRow,
    LeverageRow,
    OneArmLeverageRow,
    OneArmDumbbellRow,
    DumbbellPullOver,
    CablePullOver,
    BarbellHipThrust,
    SmithHipThrust,
    CableKickback,
    PlieSquats,
    ThighAdductor,
    ThighAbductor,
    DumbbellInclineBenchPress,
    BarbellInclineBenchPress,
    SmithInclineBenchPress,
    InclineDumbbellFlyes,
    InclineCableFlyes,
    DumbbellBenchPress,
    BarbellBenchPress,
    SmithBenchPress,
    Dips,
    DumbbellFlyes,
    PekDek,
    CableFlyes,
    CableCrossover,
    StandBarbellMilitaryPress,
    SeatedBarbellMilitaryPress,
    SmithMilitaryPress,
    SeatedDumbbellPress,
    DumbbellFrontRaise,
    CableFrontRaise,
    DumbbellSideLateralRaise,
    OneArmDumbbellSideLateralRaise,
    CableSideLateralRaise,
    OneArmCableSideLateralRaise,
    BarbellUprightRow,
    SmithUprightRow,
    BentOverDumbbellRearDeltRaise,
    CableRearDeltRaise,
    ReversePekDek,
    BarbellCloseGripBenchPress,
    SmithCloseGripBenchPress,
    BarbellBenchArmExtension,
    DumbbellBenchArmExtension,
    BarbellSeatedArmExtension,
    DumbbellSeatedArmExtension,
    OneArmDumbbellStandArmExtension,
    CableArmExtension,
    RopeArmExtension,
    WideGripBarbellStandArmsCurl,
    CloseGripBarbellStandArmsCurl,
    DumbbellStandArmsCurl,
    CableStandArmsCurl,
    CrossoverArmsCurl,
    DumbbellBenchArmsCurl,
    HammerCurl,
    ConcentrationCurl,
    BarbellPreacherCurl,
    DumbbellPreacherCurl,
    OneArmDumbbellPreacherCurl,
    Hyperextension,
    StandCalfRaise,
    SeatCalfRaise,
    ReverseCrunch,
    LyingReverseCrunch,
    Crunch,
    CableCrunch,
    Walking,
    Bicycle,
    Orbitrek,
    Cardio,
    Interval,
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
            //Expersices
            [LocId.BarbellSquats]: 'Приседания со штангой {[?](http://sportwiki.to/%D0%9F%D1%80%D0%B8%D1%81%D0%B5%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F_%D1%81%D0%BE_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%BE%D0%B9)}',
            [LocId.SmithSquats]: 'Приседания в тренажере Смита {[?](http://sportwiki.to/%D0%9F%D1%80%D0%B8%D1%81%D0%B5%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5_%D0%A1%D0%BC%D0%B8%D1%82%D0%B0)}',
            [LocId.LegPress]: 'Жим ногами {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%BD%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8)}',
            [LocId.OneLegPress]: 'Жим одной ногой {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%BD%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8)}',
            [LocId.LegExtension]: 'Разгибания ног {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D1%8F_%D0%BD%D0%BE%D0%B3_%D0%B2_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',
            [LocId.OneLegExtension]: 'Разгибания одной ноги {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D1%8F_%D0%BD%D0%BE%D0%B3_%D0%B2_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',
            [LocId.SmithLunge]: '{Выпады в тренажере Смита [?](http://sportwiki.to/%D0%92%D1%8B%D0%BF%D0%B0%D0%B4%D1%8B)}',
            [LocId.DumbbellLunge]: 'Выпады с гантелями {[?](http://sportwiki.to/%D0%92%D1%8B%D0%BF%D0%B0%D0%B4%D1%8B_%D1%81_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8)}',

            [LocId.BarbellRomanianDeadLift]: 'Румынская тяга со штангой {[?](http://sportwiki.to/%D0%A0%D1%83%D0%BC%D1%8B%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%82%D1%8F%D0%B3%D0%B0)}',
            [LocId.DumbbellRomanianDeadLift]: 'Румынская тяга с гантелями {[?](http://sportwiki.to/%D0%A0%D1%83%D0%BC%D1%8B%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%82%D1%8F%D0%B3%D0%B0)}',
            [LocId.LyingLegCurl]: 'Сгибание ног лёжа {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BD%D0%BE%D0%B3_%D0%B2_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5_%D0%BB%D0%B5%D0%B6%D0%B0)}',
            [LocId.SeatedLegCurl]: 'Сгибание ног сидя {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BD%D0%BE%D0%B3_%D1%81%D0%B8%D0%B4%D1%8F)}',

            [LocId.WideGripCablePullDown]: 'Тяга верхнего блока широким хватом {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%B5%D0%B3%D0%BE_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0_%D0%BA_%D0%B3%D1%80%D1%83%D0%B4%D0%B8)}',
            [LocId.CloseGripCablePullDown]: 'Тяга верхнего блока узким хватом {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%B5%D0%B3%D0%BE_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0_%D0%BA_%D0%B3%D1%80%D1%83%D0%B4%D0%B8)}',
            [LocId.PullUps]: 'Подтягивания (в тренажере) {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%82%D1%8F%D0%B3%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',
            [LocId.BentOverBarbellRow]: 'Тяга штанги в наклоне {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%B8_%D0%B2_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%B5_(%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE))}',
            [LocId.TBarRowRow]: 'Тяга с упором в тренажере {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%BA_%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D1%83_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5))}',
            [LocId.CableRow]: 'Тяга нижнего блока к поясу {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0_%D0%BA_%D0%BF%D0%BE%D1%8F%D1%81%D1%83_%D1%81%D0%B8%D0%B4%D1%8F)}',
            [LocId.LeverageRow]: 'Горизонтальная рычажная тяга {[?](http://sportwiki.to/%D0%93%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%BD%D1%82%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%80%D1%8B%D1%87%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D1%82%D1%8F%D0%B3%D0%B0)}',
            [LocId.OneArmLeverageRow]: 'Горизонтальная рычажная тгяа одной рукой {[?](http://sportwiki.to/%D0%93%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%BD%D1%82%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%80%D1%8B%D1%87%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D1%82%D1%8F%D0%B3%D0%B0)}',
            [LocId.OneArmDumbbellRow]: 'Тяга гантели в наклоне {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B8_%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9_%D1%80%D1%83%D0%BA%D0%BE%D0%B9_%D1%81%D1%82%D0%BE%D1%8F_%D0%B2_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%B5)}',
            [LocId.DumbbellPullOver]: 'Пулловер с гантелью {[?](http://sportwiki.to/%D0%9F%D1%83%D0%BB%D0%BE%D0%B2%D0%B5%D1%80%D1%8B_%D0%BF%D1%80%D1%8F%D0%BC%D1%8B%D0%BC%D0%B8_%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8)}',
            [LocId.CablePullOver]: 'Пулловер на блоке {[?](http://sportwiki.to/%D0%9F%D1%83%D0%BB%D0%BE%D0%B2%D0%B5%D1%80%D1%8B_%D0%BF%D1%80%D1%8F%D0%BC%D1%8B%D0%BC%D0%B8_%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8)}',

            [LocId.BarbellHipThrust]: 'Подъем таза со штангой {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D1%82%D0%B0%D0%B7%D0%B0)}',
            [LocId.SmithHipThrust]: 'Подъем таза в тренажере Смита {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D1%82%D0%B0%D0%B7%D0%B0)}',
            [LocId.CableKickback]: 'Отведение ноги на блоке {[?](http://sportwiki.to/%D0%9E%D1%82%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BD%D0%BE%D0%B3%D0%B8_%D0%BD%D0%B0_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B5)}',
            [LocId.PlieSquats]: 'Приседания с гантелью между ног {[?](http://sportwiki.to/%D0%9F%D1%80%D0%B8%D1%81%D0%B5%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BB%D0%B8%D0%B5)}',
            [LocId.ThighAdductor]: 'Сведения ног {[?](http://sportwiki.to/%D0%A1%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BD%D0%BE%D0%B3_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',
            [LocId.ThighAbductor]: 'Разведение ног {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BD%D0%BE%D0%B3_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',

            [LocId.DumbbellInclineBenchPress]: 'Жим лежа гантелей в наклоне {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%BD%D0%B0_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5)}',
            [LocId.BarbellInclineBenchPress]: 'Жим лежа штанги в наклоне {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%B8_%D0%BD%D0%B0_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5_%D1%81_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%BE%D0%BC_%D0%B2%D0%B2%D0%B5%D1%80%D1%85)}',
            [LocId.SmithInclineBenchPress]: 'Жим лежа в наклоне в тренажере Смита {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%BB%D0%B5%D0%B6%D0%B0_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5_%D0%A1%D0%BC%D0%B8%D1%82%D0%B0)}',
            [LocId.InclineDumbbellFlyes]: 'Сведения рук с гантелями в наклоне {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BB%D0%B5%D0%B6%D0%B0)}',
            [LocId.InclineCableFlyes]: 'Сведения рук на блоках в наклоне {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BB%D0%B5%D0%B6%D0%B0)}',
            [LocId.DumbbellBenchPress]: 'Жим лежа гантелей {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%BB%D0%B5%D0%B6%D0%B0)}',
            [LocId.BarbellBenchPress]: 'Жим лежа штанги {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%B8_%D0%BE%D1%82_%D0%B3%D1%80%D1%83%D0%B4%D0%B8_%D0%BB%D0%B5%D0%B6%D0%B0)}',
            [LocId.SmithBenchPress]: 'Жим лежа в тренажере Смита {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%BB%D0%B5%D0%B6%D0%B0_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5_%D0%A1%D0%BC%D0%B8%D1%82%D0%B0)}',
            [LocId.PekDek]: 'Сведение рук в тренажере {[?](http://sportwiki.to/%D0%A1%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B8_%D1%80%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_(%D0%B1%D0%B0%D0%B1%D0%BE%D1%87%D0%BA%D0%B0))}',
            [LocId.Dips]: 'Отжимания на брусьях {[?](http://sportwiki.to/%D0%9E%D1%82%D0%B6%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D1%8F_%D0%BD%D0%B0_%D0%B1%D1%80%D1%83%D1%81%D1%8C%D1%8F%D1%85)}',
            [LocId.DumbbellFlyes]: 'Сведения рук с гантелями {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8)}',
            [LocId.CableFlyes]: 'Сведения рук на блоках {[?](http://sportwiki.to/%D0%A1%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81_%D1%82%D1%80%D0%BE%D1%81%D0%BE%D0%BC_(%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%B5%D1%80))}',
            [LocId.CableCrossover]: 'Сведения рук в кроссовере {[?](http://sportwiki.to/%D0%A1%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%B5%D1%80%D0%B5)}',

            [LocId.StandBarbellMilitaryPress]: 'Жим штанги стоя {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%B8_%D1%81%D1%82%D0%BE%D1%8F)}',
            [LocId.SeatedBarbellMilitaryPress]: 'Жим штанги сидя {[?](http://sportwiki.to/%D0%90%D1%80%D0%BC%D0%B5%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%B6%D0%B8%D0%BC)}',
            [LocId.SmithMilitaryPress]: 'Жим сидя в тренажере Смита {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D1%81%D0%B8%D0%B4%D1%8F_%D0%B2_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5_%D0%A1%D0%BC%D0%B8%D1%82%D0%B0)}',
            [LocId.SeatedDumbbellPress]: 'Жим гантелей сидя {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D1%81%D0%B8%D0%B4%D1%8F)}',
            [LocId.DumbbellFrontRaise]: 'Подъем рук с гантелями перед собой {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D1%80%D1%83%D0%BA_%D1%81_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8_%D0%BF%D0%B5%D1%80%D0%B5%D0%B4_%D1%81%D0%BE%D0%B1%D0%BE%D0%B9)}',
            [LocId.CableFrontRaise]: 'Подъем рук на блоке перед собой {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%BD%D0%B8%D0%B6%D0%BD%D0%B5%D0%B3%D0%BE_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0_%D0%B2%D0%BF%D0%B5%D1%80%D0%B5%D0%B4)}',
            [LocId.DumbbellSideLateralRaise]: 'Разведение гантелей в стороны {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%B2_%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D1%8B)}',
            [LocId.OneArmDumbbellSideLateralRaise]: 'Отведение гантели в сторону одной рукой {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%B2_%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D1%8B)}',
            [LocId.CableSideLateralRaise]: 'Разведение рук в стороны на блоках {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81%D1%82%D0%BE%D1%8F)}',
            [LocId.OneArmCableSideLateralRaise]: 'Отведение в сторону одной рукой на блоке {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81%D1%82%D0%BE%D1%8F)}',
            [LocId.BarbellUprightRow]: 'Тяга штанги к подбородку {[?](http://sportwiki.to/%D0%A2%D1%8F%D0%B3%D0%B0_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%B8_%D0%BA_%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%B4%D0%BA%D1%83)}',
            [LocId.SmithUprightRow]: 'Тяга к подбородку в тренажере Смита {[?](http://sportswiki.ru/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%BA_%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%B4%D0%BA%D1%83)}',
            [LocId.BentOverDumbbellRearDeltRaise]: 'Разведение гантелей в стороны в наклоне {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%B2_%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D1%8B_%D0%B2_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%B5)}',
            [LocId.ReversePekDek]: 'Разведение рук на тренажере {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',
            [LocId.CableRearDeltRaise]: 'Разведения рук в кроссовере {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',

            [LocId.BarbellCloseGripBenchPress]: 'Жим лежа штанги узким хватом {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%BB%D0%B5%D0%B6%D0%B0_%D1%83%D0%B7%D0%BA%D0%B8%D0%BC_%D1%85%D0%B2%D0%B0%D1%82%D0%BE%D0%BC)}',
            [LocId.SmithCloseGripBenchPress]: 'Жим лежа узким хватом в тренажере Смита {[?](http://sportwiki.to/%D0%96%D0%B8%D0%BC_%D0%BB%D0%B5%D0%B6%D0%B0_%D1%83%D0%B7%D0%BA%D0%B8%D0%BC_%D1%85%D0%B2%D0%B0%D1%82%D0%BE%D0%BC)}',
            [LocId.BarbellBenchArmExtension]: 'Разгибания рук со штангой лежа {[?](http://sportwiki.to/%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%81%D0%BA%D0%B8%D0%B9_%D0%B6%D0%B8%D0%BC)}',
            [LocId.DumbbellBenchArmExtension]: 'Разгибания рук с гантелями лежа {[?](http://sportwiki.to/%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%81%D0%BA%D0%B8%D0%B9_%D0%B6%D0%B8%D0%BC_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%BB%D0%B5%D0%B6%D0%B0)}',
            [LocId.BarbellSeatedArmExtension]: 'Разгибания рук со штангой сидя {[?](http://sportwiki.to/%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%81%D0%BA%D0%B8%D0%B9_%D0%B6%D0%B8%D0%BC_%D1%81%D0%B8%D0%B4%D1%8F)}',
            [LocId.DumbbellSeatedArmExtension]: 'Разгибания рук с гантелей сидя {[?](http://sportwiki.to/%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%81%D0%BA%D0%B8%D0%B9_%D0%B6%D0%B8%D0%BC_%D1%81%D0%B8%D0%B4%D1%8F)}',
            [LocId.OneArmDumbbellStandArmExtension]: 'Разгибание с гантелью одной рукой {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9_%D1%80%D1%83%D0%BA%D0%B8_%D1%81_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D1%8C%D1%8E_%D0%B8%D0%B7-%D0%B7%D0%B0_%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D1%8B)}',
            [LocId.CableArmExtension]: 'Разгибания рук на блоке {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',
            [LocId.RopeArmExtension]: 'Разгибания рук с канатной рукоятью {[?](http://sportwiki.to/%D0%A0%D0%B0%D0%B7%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D1%82%D1%80%D0%B8%D1%86%D0%B5%D0%BF%D1%81_%D1%81_%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%D0%BC_%D0%BA%D0%B0%D0%BD%D0%B0%D1%82%D0%BD%D0%BE%D0%B9_%D1%80%D1%83%D0%BA%D0%BE%D1%8F%D1%82%D0%B8)}',

            [LocId.WideGripBarbellStandArmsCurl]: 'Сгибания рук со штангой широким хватом {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81%D0%BE_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%BE%D0%B9)}',
            [LocId.CloseGripBarbellStandArmsCurl]: 'Сгибания рук со штангой узким хватом {[?](http://sportswiki.ru/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D1%88%D1%82%D0%B0%D0%BD%D0%B3%D0%B8_%D0%BD%D0%B0_%D0%B1%D0%B8%D1%86%D0%B5%D0%BF%D1%81)}',
            [LocId.DumbbellStandArmsCurl]: 'Сгибания рук с гантелями {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D0%BD%D0%B0_%D0%B1%D0%B8%D1%86%D0%B5%D0%BF%D1%81)}',
            [LocId.CableStandArmsCurl]: 'Сгибания рук на блоке {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D0%B2_%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%B5%D1%80%D0%B5)}',
            [LocId.CrossoverArmsCurl]: 'Сгибания рук в уроссовере {[?](http://sportswiki.ru/%D0%A2%D1%8F%D0%B3%D0%B0_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0_%D0%BD%D0%B0_%D0%B1%D0%B8%D1%86%D0%B5%D0%BF%D1%81)}',
            [LocId.DumbbellBenchArmsCurl]: 'Сгибания рук на наклонной скамье {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8_%D0%BD%D0%B0_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5)}',
            [LocId.HammerCurl]: 'Сгибания рук с гантелями в стиле молота {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA_%D1%81_%D0%B3%D0%B0%D0%BD%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8_%D1%85%D0%B2%D0%B0%D1%82%D0%BE%D0%BC_%C2%AB%D0%BC%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%BA%C2%BB)}',
            [LocId.ConcentrationCurl]: 'Концентрированные сгибания рук {[?](http://sportwiki.to/%D0%9A%D0%BE%D0%BD%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D1%81%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D0%BA%D0%B8_%D0%BD%D0%B0_%D0%B1%D0%B8%D1%86%D0%B5%D0%BF%D1%81)}',
            [LocId.BarbellPreacherCurl]: 'Сгибания рук со штангой в скамье Скотта {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D1%8F_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5_%D0%A1%D0%BA%D0%BE%D1%82%D1%82%D0%B0)}',
            [LocId.DumbbellPreacherCurl]: 'Сгибания руки с гантелью в скамье Скотта {[?](http://sportwiki.to/%D0%A1%D0%B3%D0%B8%D0%B1%D0%B0%D0%BD%D0%B8%D1%8F_%D1%80%D1%83%D0%BA_%D0%BD%D0%B0_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5_%D0%A1%D0%BA%D0%BE%D1%82%D1%82%D0%B0)}',
            [LocId.OneArmDumbbellPreacherCurl]: '{[?]()}',

            [LocId.Hyperextension]: 'Гиперэкстензия {[?](http://sportwiki.to/%D0%93%D0%B8%D0%BF%D0%B5%D1%80%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D0%B8)}',

            [LocId.StandCalfRaise]: 'Подъем на носках стоя {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D0%BD%D0%B0_%D0%BD%D0%BE%D1%81%D0%BA%D0%B8)}',
            [LocId.SeatCalfRaise]: 'Подьем на носках сидя {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D0%BD%D0%B0_%D0%BD%D0%BE%D1%81%D0%BA%D0%B0%D1%85_%D1%81%D0%B8%D0%B4%D1%8F)}',

            [LocId.ReverseCrunch]: 'Подъем ног в висе {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D0%BD%D0%BE%D0%B3_%D0%B2_%D0%B2%D0%B8%D1%81%D0%B5)}',
            [LocId.LyingReverseCrunch]: 'Подъем ног лежа {[?](http://sportwiki.to/%D0%9F%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC_%D0%BD%D0%BE%D0%B3_%D0%BD%D0%B0_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5)}',
            [LocId.Crunch]: 'Скручивания {[?](http://sportwiki.to/%D0%A1%D0%BA%D1%80%D1%83%D1%87%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D1%81_%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC%D0%BE%D0%BC_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%D0%B0_%D0%BD%D0%B0_%D0%BD%D0%B0%D0%BA%D0%BB%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9_%D1%81%D0%BA%D0%B0%D0%BC%D1%8C%D0%B5)}',
            [LocId.CableCrunch]: 'Скручивания на блоке {[?](http://sportwiki.to/%D0%A1%D0%BA%D1%80%D1%83%D1%87%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D0%B2_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B5)}',

            [LocId.Walking]: 'Ходьба на беговой дорожке под углом {[?](http://sportwiki.to/%D0%91%D0%B5%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D1%8B)}',
            [LocId.Bicycle]: 'Велотренажер {[?](http://sportwiki.to/%D0%92%D0%B5%D0%BB%D0%BE%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80)}',
            [LocId.Orbitrek]: 'Элипсоид {[?](http://sportwiki.to/%D0%AD%D0%BB%D0%BB%D0%B8%D0%BF%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80)}',

            [LocId.Cardio]: 'Кардио',
            [LocId.Interval]: '[Интервальное кардио] (http://sportwiki.to/%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D1%82%D1%80%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3)',
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