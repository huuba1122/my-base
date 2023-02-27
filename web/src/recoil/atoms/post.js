import { atom } from 'recoil';

const postListState = atom({
  key: 'postListState',
  default: []
});

const postListFilterState = atom({
  key: 'postListFilterState',
  default: ''
});

export { postListState, postListFilterState };
