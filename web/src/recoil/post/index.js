import { atom, selector } from 'recoil';

export const postSt = atom({
  key: 'postSt',
  default: {}
});

export const categoryOptionsSlt = selector({
  key: 'categoryOptionsSlt',
  get: ({ get }) => {
    const { extra = {} } = get(postSt);
    return extra?.categories || [];
  }
});
