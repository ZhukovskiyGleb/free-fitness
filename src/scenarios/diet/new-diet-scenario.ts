import {ActionResults, Scenario} from "../scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../../utils/keyboard-maker";
import {Localization, LocId} from "../../localization/localization";
import {Diet} from "../../content/diet";
import {DietScenarioUtils} from "./diet-scenario-utils";
import {log} from "../../utils/utils";
import {WelcomeScenario} from "../welcome/welcome-scenario";
import {DietScenario} from "./diet-scenario";

export class NewDietScenario extends Scenario {
    private readonly TARGET_STATE = 'NEW_DIET_TARGET_STATE';
    private readonly MEAL_AMOUNT_STATE = 'NEW_DIET_MEAL_AMOUNT_STATE';
    private readonly EXCLUDING_STATE = 'NEW_DIET_EXCLUDING_STATE';
    private readonly FORMATION_STATE = 'NEW_DIET_FORMATION_STATE';
    private readonly RESULT_STATE = 'NEW_DIET_RESULT_STATE';

    private _diet?: Diet;
    private _excludeKeyboard?:KeyboardMaker;

    init(): void {

        this.addAction(this.INIT_STATE,
            params => {
                this._diet = new Diet();

                this.setState(this.TARGET_STATE);
                return ActionResults.Repeat;
        });

        this.addAction(this.TARGET_STATE,
          params => {
            const { callback, chatId, lang } = params;

                switch (callback) {
                    case DietScenarioUtils.LOSS_CALLBACK:
                    case DietScenarioUtils.SUPPORT_CALLBACK:
                    case DietScenarioUtils.GAIN_CALLBACK:
                        if (this._diet) {
                            this._diet.setTarget(DietScenarioUtils.getTargetByCallback(callback));
                            this.setState(this.MEAL_AMOUNT_STATE);
                        }

                        return ActionResults.Repeat;
                    default:
                        this._bot.sendMessage(
                          chatId,
                          Localization.loc(lang, LocId.DietTarget),
                          this.getTargetKeyboard(lang)
                        );
                }
        });

        this.addAction(this.MEAL_AMOUNT_STATE,
        params => {
            const { callback, chatId, lang } = params;

            switch (callback) {
                case DietScenarioUtils.MEAL_AMOUNT_3:
                case DietScenarioUtils.MEAL_AMOUNT_4:
                case DietScenarioUtils.MEAL_AMOUNT_5:
                case DietScenarioUtils.MEAL_AMOUNT_6:
                    if (this._diet) {
                        this._diet.setMealsAmount(DietScenarioUtils.getMealsAmountByCallback(callback));
                        this.setState(this.EXCLUDING_STATE);
                    }

                    return ActionResults.Repeat;
                default:
                    this._bot.sendMessage(
                      chatId,
                      Localization.loc(lang, LocId.MealsAmount),
                      this.getMealsAmountKeyboard()
                    );
            }
        });

        this.addAction(this.EXCLUDING_STATE,
          params => {
            const { callback, chatId, lang } = params;

            switch (callback) {
                case DietScenarioUtils.FOOD_MEAT:
                case DietScenarioUtils.FOOD_POULTRY:
                case DietScenarioUtils.FOOD_FISH:
                case DietScenarioUtils.FOOD_SEAFOOD:
                case DietScenarioUtils.FOOD_EGGS:
                case DietScenarioUtils.FOOD_MILK:
                case DietScenarioUtils.FOOD_FRUITS:
                case DietScenarioUtils.FOOD_EXPENSIVE:
                case DietScenarioUtils.FOOD_SPORT_NUTRITION:
                    if (this._excludeKeyboard) {
                        this._excludeKeyboard.updateCheckbox(callback);

                        this._bot.sendMessage(
                            chatId,
                            Localization.loc(lang, LocId.ExcludeFood),
                            this._excludeKeyboard.result
                        );
                    }
                    break;
                case DietScenarioUtils.CONTINUE:
                    if (this._diet && this._excludeKeyboard) {
                       this._diet.setExcludes(
                         DietScenarioUtils.getExcludesByCheckboxes(
                           this._excludeKeyboard.checkboxes
                         )
                       );
                    }

                    this.setState(this.FORMATION_STATE);
                    return ActionResults.Repeat;
                default:
                    this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.ExcludeFood),
                        this.getExcludeKeyboard(lang)
                    );
            }
        });

        this.addAction(this.FORMATION_STATE,
            params => {
              const { callback, chatId, lang } = params;

              switch (callback) {
                  case DietScenarioUtils.FORMATION_VARIETY_CALLBACK:
                  case DietScenarioUtils.FORMATION_MONOTONY_CALLBACK:
                      if (this._diet) {
                          this._diet.setFormation(DietScenarioUtils.getFormationByCallback(callback));
                          this.setState(this.RESULT_STATE);
                      }

                      return ActionResults.Repeat;
                  default:
                    this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.DietFormation),
                        this.getFormationKeyboard(lang)
                    );
              }
          });

        this.addAction(this.RESULT_STATE,
            params => {
              const { callback, chatId, lang, userId } = params;

              switch (callback) {
                  case DietScenarioUtils.RESULT_SAVE_CALLBACK:
                  case DietScenarioUtils.BACK_CALLBACK:
                      this.switchToAnotherScenario(userId, DietScenario, params);
                      return ActionResults.ReadyForDestroy;
                default:
                    const user = this._userManager.getUser(userId);
                    if (user && this._diet) {
                        const dietDescription = this._diet.getDiet(user, lang);
                        if (dietDescription) {
                            this._bot.sendMessage(
                                chatId,
                                dietDescription,
                                this.getResultKeyboard(lang)
                            );
                            return;
                        }
                    }
                    log('Diet creating: something go wrong!');
                    this.switchToAnotherScenario(userId, WelcomeScenario, params);
                    return ActionResults.ReadyForDestroy;
              }
          });
    }

    private getTargetKeyboard(lang:string): InlineKeyboardButton[][] {
          return new KeyboardMaker()
          .addButton(Localization.loc(lang, LocId.TargetLoss), DietScenarioUtils.LOSS_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.TargetSupport), DietScenarioUtils.SUPPORT_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.TargetGain), DietScenarioUtils.GAIN_CALLBACK)
          .result;
    }

    private getMealsAmountKeyboard(): InlineKeyboardButton[][] {
        return new KeyboardMaker()
        .addButton('3', DietScenarioUtils.MEAL_AMOUNT_3)
        .addButton('4', DietScenarioUtils.MEAL_AMOUNT_4)
        .addButton('5', DietScenarioUtils.MEAL_AMOUNT_5)
        .addButton('6', DietScenarioUtils.MEAL_AMOUNT_6)
        .result;
  }

    private getExcludeKeyboard(lang:string): InlineKeyboardButton[][] {
      this._excludeKeyboard = new KeyboardMaker()
            .addButton(Localization.loc(lang, LocId.FoodTypeMeat), DietScenarioUtils.FOOD_MEAT, true)
            .addButton(Localization.loc(lang, LocId.FoodTypePoultry), DietScenarioUtils.FOOD_POULTRY, true)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.FoodTypeFish), DietScenarioUtils.FOOD_FISH, true)
            .addButton(Localization.loc(lang, LocId.FoodTypeSeafood), DietScenarioUtils.FOOD_SEAFOOD, true)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.FoodTypeEggs), DietScenarioUtils.FOOD_EGGS, true)
            .addButton(Localization.loc(lang, LocId.FoodTypeFruits), DietScenarioUtils.FOOD_FRUITS, true)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.FoodTypeMilk), DietScenarioUtils.FOOD_MILK, true)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.FoodTypeSportNutrition), DietScenarioUtils.FOOD_SPORT_NUTRITION, true)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.FoodTypeExpensive), DietScenarioUtils.FOOD_EXPENSIVE, true)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.ButtonContinue), DietScenarioUtils.CONTINUE);

      return this._excludeKeyboard.result;
  }

    private getFormationKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
              .addButton(Localization.loc(lang, LocId.FormationVariety), DietScenarioUtils.FORMATION_VARIETY_CALLBACK)
              .addButton(Localization.loc(lang, LocId.FormationMonotony), DietScenarioUtils.FORMATION_MONOTONY_CALLBACK)
              .result;
    }

    private getResultKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton(Localization.loc(lang, LocId.ButtonSave), DietScenarioUtils.RESULT_SAVE_CALLBACK)
            .nextLine()
            .addButton(Localization.loc(lang, LocId.ButtonBack), DietScenarioUtils.BACK_CALLBACK)
            .result;
    }


    destroy(): void {
        super.destroy();
    }
}