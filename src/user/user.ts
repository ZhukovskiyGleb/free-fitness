export enum Gender {
    Male = 'male',
    Female = 'female',
}

export enum BodyType {
    Thin = 'thin',
    Muscular = 'muscular',
    Large = 'large',
    Overweight = 'overweight',
    Common = 'common',
}

export enum Activity {
    Nothing = 'nothing',
    Easy = 'easy',
    Average = 'average',
    Heavy = 'heavy',
}

export enum Experience {
    Junior = 'junior',
    Middle = 'middle',
    Senior = 'senior',
}

export enum UserProperty {
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
    [UserProperty.SavedDiet]?: {};
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

    public hasProperties(requestProps: UserProperty[]): boolean {
        requestProps.forEach((property: UserProperty) => {
            if (!this._properties.hasOwnProperty(property)) {
                return false;
            }
        });

        return true;
    }

    public getProperties(requestProps: UserProperty[]): UserProperties {
        const result: UserProperties = {};
        requestProps.forEach((property: UserProperty) => {
            if (this._properties.hasOwnProperty(property)) {
                // @ts-ignore
                result[property] = this._properties[property];
            }
        });

        return result;
    }

    public getProperty<T>(property: UserProperty): T | undefined {
        if (this._properties.hasOwnProperty(property)) {
            return <T>this._properties[property];
        }
        return undefined;
    }

    public get properties(): UserProperties {
        return {...this._properties};
    }

    public setProperty<T>(property: UserProperty, value: T): void {
        // @ts-ignore
        this._properties[property] = value;
    }

}
