export enum Gender {
    Male,
    Female
}

export enum BodyType {
    Thin,
    Muscular,
    Large,
    Overweight,
    Common
}

export enum Activity {
    Nothing,
    Easy,
    Average,
    Heavy
}

export enum Experience {
    Junior,
    Middle,
    Senior
}

export enum UserProperty {
    RequestsAmount = 'requestsAmount',
    RegisterDate = 'registerDate',
    LastChangeDate = 'lastChangeDate',
    LastVisitDate = 'lastVisitDate',
    ShowDarkSide = 'showDarkSide',
    DarkSideAccess = 'darkSideAccess',
    ContactsNotified = 'contactsNotified',
    Weight = 'weight',
    Height = 'height',
    YearOfBirth = 'yearOfBirth',
    Gender = 'gender',
    BodyType = 'bodyType',
    Activity = 'activity',
    Experience = 'experience',
}

export interface UserProperties {
    [UserProperty.RequestsAmount]?: number,
    [UserProperty.RegisterDate]?: number,
    [UserProperty.LastChangeDate]?: number,
    [UserProperty.LastVisitDate]?: number,
    [UserProperty.ShowDarkSide]?: boolean,
    [UserProperty.DarkSideAccess]?: boolean,
    [UserProperty.ContactsNotified]?: boolean,
    [UserProperty.Weight]?: number,
    [UserProperty.Height]?: number,
    [UserProperty.YearOfBirth]?: number,
    [UserProperty.Gender]?: Gender,
    [UserProperty.BodyType]?: BodyType,
    [UserProperty.Activity]?: Activity,
    [UserProperty.Experience]?: Experience

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

    public getProperty(property: UserProperty): unknown {
        if (this._properties.hasOwnProperty(property)) {
            return this._properties[property];
        }
    }

    public get properties(): UserProperties {
        const result = {};
        for (let key in this._properties) {
            // result
        }
        return {...this._properties}
    }

}