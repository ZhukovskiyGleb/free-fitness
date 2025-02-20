import {Diet} from "../subjects/diet/diet";
import {logUser} from "../utils/utils";

export const enum Gender {
    Male = 'male',
    Female = 'female',
}

export const enum BodyType {
    Thin = 'thin',
    Muscular = 'muscular',
    Large = 'large',
    Overweight = 'overweight',
    Common = 'common',
}

export const enum Activity {
    Nothing = 'nothing',
    Easy = 'easy',
    Average = 'average',
    Heavy = 'heavy',
}

export const enum Experience {
    Junior = 'junior',
    Middle = 'middle',
    Senior = 'senior',
}

export const enum UserProperty {
    RequestsAmount = 'requestsAmount',
    RegisterDate = 'registerDate',
    LastEditDate = 'lastEditDate',
    LastVisitDate = 'lastVisitDate',
    ShowDarkSide = 'showDarkSide',
    DarkSideAccess = 'darkSideAccess',
    ContactsNotified = 'contactsNotified',

    SavedDiet = 'savedDiet',
    SavedWorkout = 'savedWorkout',

    Weight = 'weight',
    Height = 'height',
    Age = 'age',
    Gender = 'gender',
    BodyType = 'bodyType',
    Activity = 'activity',
    Experience = 'experience',
}

export interface UserProperties {
    [UserProperty.RequestsAmount]?: number;
    [UserProperty.RegisterDate]?: number;
    [UserProperty.LastEditDate]?: number;
    [UserProperty.LastVisitDate]?: number;
    [UserProperty.ShowDarkSide]?: boolean;
    [UserProperty.DarkSideAccess]?: boolean;
    [UserProperty.ContactsNotified]?: boolean;
    [UserProperty.SavedDiet]?: Diet;
    [UserProperty.SavedWorkout]?: {};
    [UserProperty.Weight]?: number;
    [UserProperty.Height]?: number;
    [UserProperty.Age]?: number;
    [UserProperty.Gender]?: Gender;
    [UserProperty.BodyType]?: BodyType;
    [UserProperty.Activity]?: Activity;
    [UserProperty.Experience]?: Experience;
}

export class User {

    private readonly _properties: UserProperties = {
        [UserProperty.RequestsAmount]: 0,
        [UserProperty.ShowDarkSide]: false,
        [UserProperty.DarkSideAccess]: false,
        [UserProperty.ContactsNotified]: false
    };

    constructor(registerDate: number) {
        this._properties[UserProperty.RegisterDate] = registerDate;
    }

    public hasProperties<P extends keyof UserProperties>(requestProps: P[]): boolean {
        for (let property of requestProps) {
            if (!this._properties.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    }

    public getProperties<P extends keyof UserProperties>(requestProps: P[]): UserProperties {
        const result: UserProperties = {};
        requestProps.forEach((property: P) => {
            if (this._properties.hasOwnProperty(property)) {
                result[property] = this._properties[property];
            }
        });

        return result;
    }

    public getMissedProperties<P extends keyof UserProperties>(requestProps: P[]): UserProperty[] {
        const result: UserProperty[] = [];
        requestProps.forEach((property: P) => {
            if (!this._properties.hasOwnProperty(property)) {
                result.push(property);
            }
        });

        return result;
    }

    public getProperty<P extends keyof UserProperties>(property: P): UserProperties[P] {
        if (this._properties.hasOwnProperty(property)) {
            return this._properties[property];
        }
        return undefined;
    }

    public get properties(): UserProperties {
        return {...this._properties};
    }

    public setProperty<P extends keyof UserProperties>(property: P, value: UserProperties[P]): void {
        logUser('[User save property', property, value, ']');
        this._properties[property] = value;
    }

    public save(): void {

    }

}
