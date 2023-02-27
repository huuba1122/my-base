import { atom, selector } from 'recoil';

export const profileSt = atom({
  key: 'profileSt',
  default: {}
});

export const permissionsSlt = selector({
  key: 'permissionsSlt',
  get: ({ get }) => {
    const { permissions = {} } = get(profileSt) ?? {};
    return permissions;
  }
});
