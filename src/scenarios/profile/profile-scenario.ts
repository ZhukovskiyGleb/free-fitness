import {ActionResults, Scenario} from "../scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../../utils/keyboard-maker";
import {User, UserProperty} from "../../user/user";
import {Localization, LocId} from "../../localization/localization";
import {ProfileScenarioUtils} from "./profile-scenario-utils";
import {getDaysPast, isSomething, logScenario} from "../../utils/utils";
import {Config} from "../../configs/config";
import {Params} from "../../utils/parser";

export class ProfileScenario extends Scenario {
    private readonly APPROVE_PROPS_CORRECT_STATE = 'PROFILE_APPROVE_PROPS_CORRECT_STATE';
    private readonly CHECK_EDIT_STATE = 'PROFILE_CHECK_EDIT_STATE';
    private readonly CONFIRM_EDIT_STATE = 'PROFILE_CONFIRM_EDIT_STATE';
    private readonly EDIT_STATE = 'PROFILE_EDIT_STATE';
    private readonly NEXT_EDIT_STATE = 'PROFILE_NEXT_EDIT_STATE';

    private readonly EDIT_WEIGHT_STATE = 'PROFILE_WEIGHT_STATE';
    private readonly EDIT_HEIGHT_STATE = 'PROFILE_HEIGHT_STATE';
    private readonly EDIT_AGE_STATE = 'PROFILE_AGE_STATE';
    private readonly EDIT_GENDER_STATE = 'PROFILE_GENDER_STATE';
    private readonly EDIT_BODY_TYPE_STATE = 'PROFILE_BODY_TYPE_STATE';
    private readonly EDIT_ACTIVITY_STATE = 'PROFILE_EDIT_ACTIVITY_STATE';
    private readonly EDIT_EXPERIENCE_STATE = 'PROFILE_EDIT_EXPERIENCE_STATE';

    private _propsToEdit?: UserProperty[];
    private _propertiesFiltered: boolean = false;

    init(): void {

        this.addAction(this.INIT_STATE,
    params => {
                const { userId, chatId, lang } = params;

                const user = this._userManager.getUser(userId);
                const requestedProperties = <UserProperty[]>this.requestedData;

                logScenario('Requested', requestedProperties);
                if (user && requestedProperties) {
                    if (user.hasProperties(requestedProperties)) {
                        this._bot.sendMessage(
                            chatId,
                            this.getApproveText(lang, user, requestedProperties),
                            this.getApproveKeyboard(lang)
                        );

                        this.setState(this.APPROVE_PROPS_CORRECT_STATE);
                    } else {
                        this.setState(this.EDIT_STATE);
                        return ActionResults.Repeat;
                    }
                }
                else {
                    return ActionResults.ReadyForDestroy;
                }
        });

        this.addAction(this.APPROVE_PROPS_CORRECT_STATE,
          params => {
            const { callback } = params;

            switch (callback) {
                case ProfileScenarioUtils.APPROVE_CALLBACK:
                    return ActionResults.ReadyForDestroy;
                case ProfileScenarioUtils.EDIT_CALLBACK:
                    this.setState(this.CHECK_EDIT_STATE);
                    return ActionResults.Repeat;
            }
        });

        this.addAction(this.CHECK_EDIT_STATE,
          params => {
            const { chatId, userId, lang } = params;

            const user = this._userManager.getUser(userId);

            if (user) {
                const { lastEditDate } = user.properties;

                if (lastEditDate) {
                    const daysToEdit = getDaysPast(lastEditDate, Config.daysBeforeEdit);

                    this._bot.sendMessage(
                      chatId,
                      this.getCheckEditText(lang, daysToEdit),
                      this.getCheckEditKeyboard(lang, daysToEdit)
                    );

                    this.setState(this.CONFIRM_EDIT_STATE);
                }
                else {
                    this.setState(this.EDIT_STATE);
                    return ActionResults.Repeat;
                }
            }
            else {
                return ActionResults.ReadyForDestroy;
            }
        });

        this.addAction(this.CONFIRM_EDIT_STATE,
          params => {
              const { callback, userId } = params;

              switch (callback) {
                  case ProfileScenarioUtils.CONTINUE_CALLBACK:
                      const  user = this._userManager.getUser(userId);
                      if (user) {
                          user.setProperty(UserProperty.LastEditDate, new Date().getTime());
                      }
                      this.setState(this.EDIT_STATE);
                      return ActionResults.Repeat;
                  case ProfileScenarioUtils.BACK_CALLBACK:
                      return ActionResults.ReadyForDestroy;
              }
          });

        this.addAction(this.EDIT_STATE,
          params => {
              const { userId } = params;
              const user = this._userManager.getUser(userId);
              if (user) {
                  this._propsToEdit = [...<UserProperty[]>this.requestedData];

                  if (!this._propertiesFiltered) {
                      this._propertiesFiltered = true;
                      this._propsToEdit = user.getMissedProperties(this._propsToEdit);
                  }

                  if (this._propsToEdit && this._propsToEdit.length > 0) {
                      this.setState(this.NEXT_EDIT_STATE);
                      return ActionResults.Repeat;
                  }
              }
              return ActionResults.ReadyForDestroy;
        });

        this.addAction(this.NEXT_EDIT_STATE,
          params => {
              if (this._propsToEdit && this._propsToEdit.length > 0) {
                  const property = this._propsToEdit.shift();
                  logScenario('Ask for property', property);
                  switch (property) {
                      case UserProperty.Age:
                          this.setState(this.EDIT_AGE_STATE);
                          return ActionResults.Repeat;
                      case UserProperty.Gender:
                          this.setState(this.EDIT_GENDER_STATE);
                          return ActionResults.Repeat;
                      case UserProperty.Height:
                            this.setState(this.EDIT_HEIGHT_STATE);
                            return ActionResults.Repeat;
                      case UserProperty.Weight:
                          this.setState(this.EDIT_WEIGHT_STATE);
                          return ActionResults.Repeat;
                      case UserProperty.BodyType:
                          this.setState(this.EDIT_BODY_TYPE_STATE);
                          return ActionResults.Repeat;
                      case UserProperty.Activity:
                          this.setState(this.EDIT_ACTIVITY_STATE);
                          return ActionResults.Repeat;
                      case UserProperty.Experience:
                          this.setState(this.EDIT_EXPERIENCE_STATE);
                          return ActionResults.Repeat;
                      default:
                          return ActionResults.ReadyForDestroy;
                  }
              }
              else {
                  const { userId } = params;
                  const user = this._userManager.getUser(userId);

                  if (user) {
                      user.save();
                  }

                  logScenario('No properties for ask');

                  this.setState(this.INIT_STATE);
                  return ActionResults.Repeat;
              }
          });

        this.addAction(this.EDIT_AGE_STATE,
            params => {
            return this.checkTextInput(params, /^[0-9][0-9]?$/, {min: 10, max: 99}, UserProperty.Age, LocId.InputAge);
        });

        this.addAction(this.EDIT_GENDER_STATE,
          params => {
              const { chatId, lang, callback, userId } = params;

              switch (callback) {
                  case ProfileScenarioUtils.GENDER_MALE_CALLBACK:
                  case ProfileScenarioUtils.GENDER_FEMALE_CALLBACK:
                      this.setPropertyByCallback(callback, userId);
                      this.setState(this.NEXT_EDIT_STATE);
                      return ActionResults.Repeat;
                  default:
                      this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.InputGender),
                        this.getGenderKeyboard(lang)
                      );
              }
          });

        this.addAction(this.EDIT_HEIGHT_STATE,
        params => {
            return this.checkTextInput(params, /^[0-9][0-9]?[0-9]?$/, {min: 50, max: 250}, UserProperty.Height, LocId.InputHeight);
        });

        this.addAction(this.EDIT_WEIGHT_STATE,
        params => {
            return this.checkTextInput(params, /^[0-9][0-9]?[0-9]?$/, {min: 30, max: 200}, UserProperty.Weight, LocId.InputWeight);
        });

        this.addAction(this.EDIT_BODY_TYPE_STATE,
          params => {
              const { chatId, lang, callback, userId } = params;

              switch (callback) {
                  case ProfileScenarioUtils.BODY_TYPE_THIN_CALLBACK:
                  case ProfileScenarioUtils.BODY_TYPE_MUSCULAR_CALLBACK:
                  case ProfileScenarioUtils.BODY_TYPE_LARGE_CALLBACK:
                  case ProfileScenarioUtils.BODY_TYPE_OVERWEIGHT_CALLBACK:
                  case ProfileScenarioUtils.BODY_TYPE_COMMON_CALLBACK:
                      this.setPropertyByCallback(callback, userId);
                      this.setState(this.NEXT_EDIT_STATE);
                      return ActionResults.Repeat;
                  default:
                      this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.InputBodyType),
                        this.getBodyTypeKeyboard(lang)
                      );
              }
          });

        this.addAction(this.EDIT_ACTIVITY_STATE,
          params => {
              const { chatId, lang, callback, userId } = params;

              switch (callback) {
                  case ProfileScenarioUtils.ACTIVITY_NOTHING_CALLBACK:
                  case ProfileScenarioUtils.ACTIVITY_EASY_CALLBACK:
                  case ProfileScenarioUtils.ACTIVITY_AVERAGE_CALLBACK:
                  case ProfileScenarioUtils.ACTIVITY_HEAVY_CALLBACK:
                      this.setPropertyByCallback(callback, userId);
                      this.setState(this.NEXT_EDIT_STATE);
                      return ActionResults.Repeat;
                  default:
                      this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.InputActivity),
                        this.getActivityKeyboard(lang)
                      );
              }
          });

        this.addAction(this.EDIT_EXPERIENCE_STATE,
          params => {
              const { chatId, lang, callback, userId } = params;

              switch (callback) {
                  case ProfileScenarioUtils.EXPERIENCE_JUNIOR_CALLBACK:
                  case ProfileScenarioUtils.EXPERIENCE_MIDDLE_CALLBACK:
                  case ProfileScenarioUtils.EXPERIENCE_SENIOR_CALLBACK:
                      this.setPropertyByCallback(callback, userId);
                      this.setState(this.NEXT_EDIT_STATE);
                      return ActionResults.Repeat;
                  default:
                      this._bot.sendMessage(
                        chatId,
                        Localization.loc(lang, LocId.InputExperience),
                        this.getExperienceKeyboard(lang)
                      );
              }
          });
    }

    private setPropertyByCallback(callback: string, userId: number): void {
        const user = this._userManager.getUser(userId);
        if (user) {
            const { property, value } = ProfileScenarioUtils.getPropertyValueByCallback(callback);
            if (isSomething(property) && isSomething(value)) {
                user.setProperty(property, value);
            }
        }
    }

    private checkTextInput(params: Params, regexp: RegExp, range: {min: number, max: number}, property: UserProperty, locId: LocId): ActionResults | void {
        const { text, chatId, lang, userId } = params;

        if (text && text.match(regexp)) {
            const value = parseInt(text, 10);
            if (value < range.min || value > range.max) {
                this.sendIncorrectInput(chatId, lang);
            }
            else {
                const user = this._userManager.getUser(userId);
                if (user) {
                    user.setProperty(property, value);
                }

                params.text = undefined;

                this.setState(this.NEXT_EDIT_STATE);
                return ActionResults.Repeat;
            }
        } else {
            this._bot.sendMessage(
              chatId,
              Localization.loc(lang, locId)
            );
        }
    }

    private sendIncorrectInput(chatId: number, lang: string): void {
        this._bot.sendMessage(
          chatId,
          Localization.loc(lang, LocId.InputIncorrect),
          undefined,
          false
        );
    }

    private getApproveText(lang: string, user: User, properties: UserProperty[]): string {
        return Localization.loc(lang, LocId.ApproveProps) + '\n' +
          ProfileScenarioUtils.getPropertiesDescription(lang, user, properties).join('\n');
    }

    private getApproveKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton(Localization.loc(lang, LocId.ButtonApprove), ProfileScenarioUtils.APPROVE_CALLBACK)
            .addButton(Localization.loc(lang, LocId.ButtonEdit), ProfileScenarioUtils.EDIT_CALLBACK)
            .result;
    }

    private getCheckEditText(lang: string, daysToEdit: number): string {
        if (daysToEdit > 0) {
            return Localization.loc(lang, LocId.EditError, {days: daysToEdit.toString()});
        }
        else {
            return Localization.loc(lang, LocId.EditWarning, {days: daysToEdit.toString()});
        }
    }

    private getCheckEditKeyboard(lang: string, daysToEdit: number): InlineKeyboardButton[][] {
        const keyboard = new KeyboardMaker();

        if (daysToEdit <= 0) {
            keyboard.addButton(Localization.loc(lang, LocId.ButtonContinue), ProfileScenarioUtils.CONTINUE_CALLBACK);
        }

        keyboard.addButton(Localization.loc(lang, LocId.ButtonBack), ProfileScenarioUtils.BACK_CALLBACK);
        return keyboard.result;
    }

    private getGenderKeyboard(lang: string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
              .addButton(Localization.loc(lang, LocId.GenderMale), ProfileScenarioUtils.GENDER_MALE_CALLBACK)
              .nextLine()
              .addButton(Localization.loc(lang, LocId.GenderFemale), ProfileScenarioUtils.GENDER_FEMALE_CALLBACK)
              .result;
    }

    private getBodyTypeKeyboard(lang: string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
          .addButton(Localization.loc(lang, LocId.BodyTypeThin), ProfileScenarioUtils.BODY_TYPE_THIN_CALLBACK)
          .addButton(Localization.loc(lang, LocId.BodyTypeMuscular), ProfileScenarioUtils.BODY_TYPE_MUSCULAR_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.BodyTypeLarge), ProfileScenarioUtils.BODY_TYPE_LARGE_CALLBACK)
          .addButton(Localization.loc(lang, LocId.BodyTypeOverweight), ProfileScenarioUtils.BODY_TYPE_OVERWEIGHT_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.BodyTypeCommon), ProfileScenarioUtils.BODY_TYPE_COMMON_CALLBACK)
          .result;
    }

    private getActivityKeyboard(lang: string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
          .addButton(Localization.loc(lang, LocId.ActivityNothing), ProfileScenarioUtils.ACTIVITY_NOTHING_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.ActivityEasy), ProfileScenarioUtils.ACTIVITY_EASY_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.ActivityAverage), ProfileScenarioUtils.ACTIVITY_AVERAGE_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.ActivityHeavy), ProfileScenarioUtils.ACTIVITY_HEAVY_CALLBACK)
          .result;
    }

    private getExperienceKeyboard(lang: string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
          .addButton(Localization.loc(lang, LocId.ExperienceJunior), ProfileScenarioUtils.EXPERIENCE_JUNIOR_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.ExperienceMiddle), ProfileScenarioUtils.EXPERIENCE_MIDDLE_CALLBACK)
          .nextLine()
          .addButton(Localization.loc(lang, LocId.ExperienceSenior), ProfileScenarioUtils.EXPERIENCE_SENIOR_CALLBACK)
          .result;
    }

    destroy(): void {
        delete this._propsToEdit;
        super.destroy();
    }
}