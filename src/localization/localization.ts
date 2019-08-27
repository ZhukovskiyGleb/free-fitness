export enum LOC_ID {
    Test
}

export class Localization<T extends keyof LOC_ID> {
    private static localizations: { [key: string]: {[key in LOC_ID]: string} } = {
        'ru': {
            [LOC_ID.Test]: 'test'
        }
    };

    public static loc(lang: string, id: LOC_ID): string {
        if (!this.localizations[lang]) {
            lang = 'ru';
        }
        return this.localizations[lang][id];
    }
}