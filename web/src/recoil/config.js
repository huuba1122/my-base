import { atom, selector } from 'recoil';

export const configSt = atom({
  key: 'configSt',
  default: {}
});

export const menuConfigSlt = selector({
  key: 'menuConfigSlt',
  get: ({ get }) => {
    const { menu_items: menuItems = [] } = get(configSt);

    return menuItems;
  }
});
