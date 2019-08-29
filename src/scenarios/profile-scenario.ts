import {ActionResults, Scenario} from "./scenario";
import {InlineKeyboardButton} from "node-telegram-bot-api";
import {KeyboardMaker} from "../utils/keyboard-maker";
import {User, UserProperty} from "../user/user";
import {Localization, LocId} from "../localization/localization";
import {ProfileUtils} from "../utils/profile-utils";

export class ProfileScenario extends Scenario {
    private readonly APPROVE_PROPS_CORRECT_STATE = 'PROFILE_APPROVE_STATE';
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

    private readonly APPROVE_CALLBACK = 'PROFILE_APPROVE_CALLBACK';
    private readonly EDIT_CALLBACK = 'PROFILE_EDIT_CALLBACK';
    private readonly CONTINUE_CALLBACK = 'PROFILE_CONTINUE_CALLBACK';
    private readonly BACK_CALLBACK = 'PROFILE_BACK_CALLBACK';

    private readonly _utils = new ProfileUtils();

    private _propsToEdit?: UserProperty[];

    init(): void {

        this.addAction(this.INIT_STATE,
    params => {
                const { userId, chatId, lang } = params;

                const user = this._userManager.getUser(userId);
                const requestedProperties = <UserProperty[]>this.requestedData;

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
                case this.APPROVE_CALLBACK:
                    return ActionResults.ReadyForDestroy;
                case this.EDIT_CALLBACK:
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
                    const daysToEdit = this._utils.getDaysBeforeEdit(lastEditDate);

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
                  case this.CONTINUE_CALLBACK:
                      const  user = this._userManager.getUser(userId);
                      if (user) {
                          user.setProperty<number>(UserProperty.LastEditDate, new Date().getTime());
                      }
                      this.setState(this.EDIT_STATE);
                      return ActionResults.Repeat;
                  case this.BACK_CALLBACK:
                      return ActionResults.ReadyForDestroy;
              }
          });

        this.addAction(this.EDIT_STATE,
              params => {
                  this._propsToEdit = [...<UserProperty[]>this.requestedData];

                  if (this._propsToEdit && this._propsToEdit.length > 0) {
                      this.setState(this.NEXT_EDIT_STATE);
                      return ActionResults.Repeat;
                  }
                  else {
                      return ActionResults.ReadyForDestroy;
                  }
              });

        this.addAction(this.NEXT_EDIT_STATE,
              params => {
                  if (this._propsToEdit && this._propsToEdit.length > 0) {
                      const property = this._propsToEdit.shift();

                      switch (property) {
                          case UserProperty.Height:
                                this.setState(this.EDIT_HEIGHT_STATE);
                                return ActionResults.Repeat;
                          case UserProperty.Weight:
                              this.setState(this.EDIT_WEIGHT_STATE);
                              return ActionResults.Repeat;
                          case UserProperty.Age:
                              this.setState(this.EDIT_AGE_STATE);
                              return ActionResults.Repeat;
                          case UserProperty.Gender:
                              this.setState(this.EDIT_GENDER_STATE);
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
                      return ActionResults.ReadyForDestroy;
                  }
              });

        this.addAction(this.EDIT_WEIGHT_STATE,
          params => {
              const { text } = params;

              // if (text && text.match(/^[1-9]$|^[1-9]\d$/))
          });
    }

    public getApproveText(lang: string, user: User, properties: UserProperty[]): string {
        return Localization.loc(lang, LocId.ApproveProps) + '\n' +
          this._utils.getPropertiesDescription(lang, user, properties).join('\n');
    }

    private getApproveKeyboard(lang:string): InlineKeyboardButton[][] {
        return new KeyboardMaker()
            .addButton(Localization.loc(lang, LocId.ButtonApprove), this.APPROVE_CALLBACK)
            .addButton(Localization.loc(lang, LocId.ButtonEdit), this.EDIT_CALLBACK)
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
            keyboard.addButton(Localization.loc(lang, LocId.ButtonContinue), this.CONTINUE_CALLBACK);
        }

        keyboard.addButton(Localization.loc(lang, LocId.ButtonBack), this.BACK_CALLBACK);
        return keyboard.result;
    }

    destroy(): void {

    }
}