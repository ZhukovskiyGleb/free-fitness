import {Activity, BodyType, Experience, Gender, User, UserProperty} from "../user/user";
import {Localization, LocId} from "../localization/localization";
import {isSomething} from "./utils";

export class ProfileUtils {
    private static PROPERTY_TO_LOC_ID: {[key in UserProperty]?: LocId} = {
        [UserProperty.Weight]: LocId.PropertyWeight,
        [UserProperty.Height]: LocId.PropertyHeight,
        [UserProperty.Age]: LocId.PropertyAge,
        [UserProperty.Gender]: LocId.PropertyGender,
        [UserProperty.BodyType]: LocId.PropertyBodyType,
        [UserProperty.Activity]: LocId.PropertyActivity,
        [UserProperty.Experience]: LocId.PropertyExperience,
    };

    private static PROPERTY_VALUE_TO_LOC_ID: {[key: string]: LocId} = {
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

    public getPropertiesDescription(lang: string, user: User, properties: UserProperty[]): string[] {
        let result: string[] = [];

        properties.forEach(property => {
            const value = this.getPropertyValue(user, property, lang);
            const locId = ProfileUtils.PROPERTY_TO_LOC_ID[property];
            if (value && isSomething(locId)) {
                result.push(Localization.loc(lang, locId, { value }));
            }
        });

        return result;
    }

    private getPropertyValue(user: User, property: UserProperty, lang: string): string | undefined {
        const value = user.getProperty<string>(property);
        if (isSomething(value)) {
            const locId = ProfileUtils.PROPERTY_VALUE_TO_LOC_ID[value];
            if (locId) {
              return Localization.loc(lang, locId);
            }
            else {
              return value;
            }
        }
    }
}