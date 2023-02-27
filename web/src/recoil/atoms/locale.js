import { atom } from 'recoil';
import LocaleService from '@src/services/helpers/i18n';

export const localeState = atom({
  key: 'locale',
  default: LocaleService.getLocale()
});
