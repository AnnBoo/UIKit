import type BigNumber from 'bignumber.js';

import type { LocalizationString } from '../LocalizationString';
import type { Language } from '../language';

declare global {
    interface String {
        path?: string;
    }
}

export type LanguageSimpleValue =
    | LocalizationString
    | LocalizationString[]
    | string[]
    | string
    | boolean;
export type LanguageValue<T = LanguageSimpleValue> =
    | Record<string, T>
    | Record<string, T>[]
    | T;
export type LanguageItem<T = LanguageValue> = Record<string, T>;

export interface LanguageOptions {
    constants?: Record<string, string>;
    images?: Record<string, string>;
    useExtendedString?: boolean;
}

export type Languages<T = LanguageItem> = Partial<Record<Language, T>>;
export type LanguagesOptions = Languages<LanguageOptions>;

export type LanguageConstants = Record<string, any>;

export type NumberFormatInfo = {
    grouping: string;
    thousands: string;
    decimal: string;
    decimalGrouping: string;
};

export type NumberParts = {
    value: BigNumber;
    integer: string;
    decimal: string;
    valueString: string;
};

export type NumberPartsOptions = {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
};

// This stores the order of the date and the separator character
// for a locale configuration. i.e.  for the date: 07.06.1986
// the position for each part is: day = 0, month = 1, year = 2
// and the separator is: '.'
export type DateFormatInfo = {
    separator: string;
    localePattern: string;
    components: string[];
};

export type StringLocaleInfo = {
    name: string;
    numbers: NumberFormatInfo;
    dates: DateFormatInfo;
};

export type LocalizedStringsMethods = {
    setLanguage(language?: string): void;
    getInterfaceLanguage(): string;
    getAvailableLanguages(): string[];
    formatString(str: string, ...values: any[]): string;
    getString(key: string, language: string): string | null;
    getLanguage(): string;
    getLanguageFromString(language: string): Language;
    amountToLocale(
        number: BigNumber | string | number,
        options?: NumberPartsOptions,
        localeInfo?: StringLocaleInfo,
    ): string;
    localizedStringForValue(value: number, base: string): string;

    changeLocaleInfo: (localeInfo: StringLocaleInfo) => void;
    changeLanguage: (language: Language) => void;
    setLanguages: (languages: Language[]) => void;
    formatTime: (time: number, format?: string) => string;
    formatDate: (time: number) => string;

    dayJSLocale: string;
    decimalSeparator: string;
    languageName: string;
    readonly localeInfo: StringLocaleInfo;
};

export type LanguageInfo = {
    name: string;
    country: string; // Works with UICountryPicker
    dayJS: string; // Works with DayJS
};

export type ShortenAmountSettings = {
    /** The number of digits in the fractional part of the number */
    fractionalDigits?: number | undefined;
    /**
     * Is it necessary to localize amount?
     * By default is `true`
     */
    isLocalized?: boolean;
};

export type ShortenedNumberSuffix =
    | '3'
    | '6'
    | '9'
    | '12'
    | '15'
    | '18'
    | '21'
    | '24'
    | '27'
    | '30';

export type ShortenedNumberSuffixLocalization = {
    [key in ShortenedNumberSuffix]: string;
};

export type ShortenAmount = (
    value: number | BigNumber | null,
    settings?: ShortenAmountSettings,
) => string;

export type ShortenedAmountAttributes = {
    value: string;
    suffix: string;
};
