import { addLocale } from 'ttag';
import LocalStorageService from './local-storage';

const DEFAULT_LOCALE = 'vi';
const SUPPORTED_LOCALES = ['vi', 'en'];

export default class LocaleService {
  static async fetchLocales() {
    const result = [];
    await Promise.all(
      SUPPORTED_LOCALES.map(async (locale) => {
        const module = await import(`../../locale/${locale}.po.json`);
        const localeObj = module.default;
        addLocale(locale, localeObj);
        result.push(localeObj);
      })
    );
    // for (const locale of SUPPORTED_LOCALES) {
    //   const module = await import(`../../locale/${locale}.po.json`);
    //   const localeObj = module.default;
    //   addLocale(locale, localeObj);
    //   result.push(localeObj);
    // }
    return result;
  }

  static setLocale(locale = DEFAULT_LOCALE) {
    LocalStorageService.set('locale', locale);
    // useLocale(locale);
    return locale;
  }

  static getLocale() {
    const locale = LocalStorageService.get('locale');
    return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  }

  static getSupportedLocales() {
    return SUPPORTED_LOCALES;
  }
}
