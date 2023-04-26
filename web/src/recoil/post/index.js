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

export const publicPostSt = atom({
  key: 'publicPostSt',
  default: {}
});

export const filterPostSt = atom({
  key: 'filterPostSt',
  default: {
    search: '',
    page: 1,
    author: null,
    categories: ''
  }
});
