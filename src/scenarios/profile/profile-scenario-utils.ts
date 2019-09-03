import {Activity, BodyType, Experience, Gender, User, UserProperties, UserProperty} from "../../user/user";
import {Localization, LocId} from "../../localization/localization";
import {isSomething} from "../../utils/utils";

interface CallbackStore<P extends keyof UserProperties> {
  [key: string]: {property: P, value: UserProperties[P]}
}

export class ProfileScenarioUtils {
    public static readonly GENDER_MALE_CALLBACK = 'PROFILE_GENDER_MALE_CALLBACK';
    public static readonly GENDER_FEMALE_CALLBACK = 'PROFILE_GENDER_FEMALE_CALLBACK';
    public static readonly BODY_TYPE_THIN_CALLBACK = 'PROFILE_BODY_THIN_CALLBACK';
    public static readonly BODY_TYPE_MUSCULAR_CALLBACK = 'PROFILE_BODY_MUSCULAR_CALLBACK';
    public static readonly BODY_TYPE_LARGE_CALLBACK = 'PROFILE_BODY_LARGE_CALLBACK';
    public static readonly BODY_TYPE_OVERWEIGHT_CALLBACK = 'PROFILE_BODY_OVERWEIGHT_CALLBACK';
    public static readonly BODY_TYPE_COMMON_CALLBACK = 'PROFILE_BODY_COMMON_CALLBACK';
    public static readonly ACTIVITY_NOTHING_CALLBACK = 'PROFILE_ACTIVITY_NOTHING_CALLBACK';
    public static readonly ACTIVITY_EASY_CALLBACK = 'PROFILE_ACTIVITY_EASY_CALLBACK';
    public static readonly ACTIVITY_AVERAGE_CALLBACK = 'PROFILE_ACTIVITY_AVERAGE_CALLBACK';
    public static readonly ACTIVITY_HEAVY_CALLBACK = 'PROFILE_ACTIVITY_HEAVY_CALLBACK';
    public static readonly EXPERIENCE_JUNIOR_CALLBACK = 'PROFILE_EXPERIENCE_JUNIOR_CALLBACK';
    public static readonly EXPERIENCE_MIDDLE_CALLBACK = 'PROFILE_EXPERIENCE_MIDDLE_CALLBACK';
    public static readonly EXPERIENCE_SENIOR_CALLBACK = 'PROFILE_EXPERIENCE_SENIOR_CALLBACK';

    public static readonly APPROVE_CALLBACK = 'PROFILE_APPROVE_CALLBACK';
    public static readonly EDIT_CALLBACK = 'PROFILE_EDIT_CALLBACK';
    public static readonly CONTINUE_CALLBACK = 'PROFILE_CONTINUE_CALLBACK';
    public static readonly BACK_CALLBACK = 'PROFILE_BACK_CALLBACK';

    private static readonly CALLBACK_TO_PROPERTY: CallbackStore<UserProperty> = {
        [ProfileScenarioUtils.GENDER_MALE_CALLBACK]: {property: UserProperty.Gender, value: Gender.Male},
        [ProfileScenarioUtils.GENDER_FEMALE_CALLBACK]: {property: UserProperty.Gender, value: Gender.Female},
        [ProfileScenarioUtils.BODY_TYPE_THIN_CALLBACK]: {property: UserProperty.BodyType, value: BodyType.Thin},
        [ProfileScenarioUtils.BODY_TYPE_MUSCULAR_CALLBACK]: {property: UserProperty.BodyType, value: BodyType.Muscular},
        [ProfileScenarioUtils.BODY_TYPE_LARGE_CALLBACK]: {property: UserProperty.BodyType, value: BodyType.Large},
        [ProfileScenarioUtils.BODY_TYPE_OVERWEIGHT_CALLBACK]: {property: UserProperty.BodyType, value: BodyType.Overweight},
        [ProfileScenarioUtils.BODY_TYPE_COMMON_CALLBACK]: {property: UserProperty.BodyType, value: BodyType.Common},
        [ProfileScenarioUtils.ACTIVITY_NOTHING_CALLBACK]: {property: UserProperty.Activity, value: Activity.Nothing},
        [ProfileScenarioUtils.ACTIVITY_EASY_CALLBACK]: {property: UserProperty.Activity, value: Activity.Easy},
        [ProfileScenarioUtils.ACTIVITY_AVERAGE_CALLBACK]: {property: UserProperty.Activity, value: Activity.Average},
        [ProfileScenarioUtils.ACTIVITY_HEAVY_CALLBACK]: {property: UserProperty.Activity, value: Activity.Heavy},
        [ProfileScenarioUtils.EXPERIENCE_JUNIOR_CALLBACK]: {property: UserProperty.Experience, value: Experience.Junior},
        [ProfileScenarioUtils.EXPERIENCE_MIDDLE_CALLBACK]: {property: UserProperty.Experience, value: Experience.Middle},
        [ProfileScenarioUtils.EXPERIENCE_SENIOR_CALLBACK]: {property: UserProperty.Experience, value: Experience.Senior},
    };

    private static readonly PROPERTY_TO_LOC_ID: {[key in UserProperty]?: LocId} = {
        [UserProperty.Weight]: LocId.PropertyWeight,
        [UserProperty.Height]: LocId.PropertyHeight,
        [UserProperty.Age]: LocId.PropertyAge,
        [UserProperty.Gender]: LocId.PropertyGender,
        [UserProperty.BodyType]: LocId.PropertyBodyType,
        [UserProperty.Activity]: LocId.PropertyActivity,
        [UserProperty.Experience]: LocId.PropertyExperience,
    };

    private static readonly PROPERTY_VALUE_TO_LOC_ID: {[key: string]: LocId} = {
      [Gender.Male]: LocId.GenderMale,
      [Gender.Female]: LocId.GenderFemale,
      [Activity.Nothing]: LocId.ActivityNothing,
      [Activity.Easy]: LocId.ActivityEasy,
      [Activity.Average]: LocId.ActivityAverage,
      [Activity.Heavy]: LocId.ActivityHeavy,
      [BodyType.Thin]: LocId.BodyTypeThin,
      [BodyType.Muscular]: LocId.BodyTypeMuscular,
      [BodyType.Large]: LocId.BodyTypeLarge,
      [BodyType.Overweight]: LocId.BodyTypeOverweight,
      [BodyType.Common]: LocId.BodyTypeCommon,
      [Experience.Junior]: LocId.ExperienceJunior,
      [Experience.Middle]: LocId.ExperienceMiddle,
      [Experience.Senior]: LocId.ExperienceSenior,
    };

    public static getPropertyValueByCallback(callback: string): { property?: UserProperty; value?: UserProperties[UserProperty] } {
        if (ProfileScenarioUtils.CALLBACK_TO_PROPERTY.hasOwnProperty(callback)) {
            return ProfileScenarioUtils.CALLBACK_TO_PROPERTY[callback];
        }
        return {};
    }

    public static getPropertiesDescription(lang: string, user: User, properties: UserProperty[]): string[] {
        let result: string[] = [];

        properties.forEach(property => {
            const value = this.getPropertyValue(user, property, lang);
            const locId = ProfileScenarioUtils.PROPERTY_TO_LOC_ID[property];
            if (value && isSomething(locId)) {
                result.push(Localization.loc(lang, locId, { value }));
            }
        });

        return result;
    }

    private static getPropertyValue(user: User, property: UserProperty, lang: string): string | undefined {
        const value = user.getProperty(property);
        if (isSomething(value)) {
            const locId = ProfileScenarioUtils.PROPERTY_VALUE_TO_LOC_ID[value.toString()];
            if (locId) {
              return Localization.loc(lang, locId);
            }
            else {
              return value.toString();
            }
        }
    }
}