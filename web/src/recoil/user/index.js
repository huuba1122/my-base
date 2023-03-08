import { atom, selector } from 'recoil';

export const staffSt = atom({
  key: 'staffSt',
  default: {}
});

export const groupOptionsSlt = selector({
  key: 'groupOptionsSlt',
  get: ({ get }) => {
    const { extra = {} } = get(staffSt);
    return extra?.groups || [];
  }
});
