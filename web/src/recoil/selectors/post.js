import { selector } from 'recoil';
import { postListState, postListFilterState } from '../atoms/post';

const filteredPostListSelector = selector({
  key: 'filteredPostListSelector',
  get: ({ get }) => {
    let postList = get(postListState);
    const filter = get(postListFilterState);
    console.log({ filter });
    if (filter) {
      postList = postList.filter((post) => post.title.includes(filter) || post.description.includes(filter));
    }
    return postList;
  }
});

export { filteredPostListSelector };
