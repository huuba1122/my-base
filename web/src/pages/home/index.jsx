import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

// apps
import LocalSpiner from '@src/components/comon/LocalSpiner';
import { fetchPublicPosts } from '@src/services/api/post';
import useScrollPosition from '@shared/hooks/useScrollPosition';
import { filterPostSt, publicPostSt } from '@recoil/post';
import { DEFAULT_MENU } from '@src/services/constants';

// import useDebounce from '@src/shared/hooks/useDebounce';
import MainContent from './main';
import PostList from './list/PostList';
import { MostViewPost } from './related';
import LeftBar from './main/LeftBar';

import './main.scss';

// ----------------------------------------------------------------
function HomePage() {
  const [filterPost, setFilterPost] = useRecoilState(filterPostSt);
  const [loading, setLoading] = React.useState(false);
  const [isReady, setReady] = React.useState(false);
  const [postState, setPostState] = useRecoilState(publicPostSt);
  const { isBottom } = useScrollPosition(200, 200);
  const prePage = React.useRef(1);

  const { items = [], pages: totalPages = 1 } = postState;
  const { page: currentPage } = filterPost;

  const getListPosts = (params) => {
    console.log({ currentPage, pre: prePage.current, isReady });
    if (currentPage !== 1 && !isReady) return;
    setLoading(true);
    fetchPublicPosts(params)
      .then((res) => {
        const { items: newItems = [] } = res;
        let listPosts = newItems;
        if (prePage.current < currentPage) {
          listPosts = [...items, ...newItems];
        }
        setPostState({ ...res, items: listPosts });

        if (!isReady) {
          setReady(true);
        }
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    const isLastPage = currentPage >= totalPages;
    if (isBottom && !isLastPage) {
      setFilterPost({ ...filterPost, page: currentPage + 1 });
    }
  }, [isBottom]);

  React.useEffect(() => {
    const { categories } = filterPost;
    getListPosts({ ...filterPost, categories: categories === DEFAULT_MENU.id ? '' : categories });

    return () => {
      prePage.current = currentPage;
    };
  }, [filterPost]);

  return (
    <MainContent left={<LeftBar />}>
      <div className="container">
        <PostList items={items} loading={loading} isReady={isReady} />
        <div className="right-content">
          <MostViewPost />
        </div>
      </div>
    </MainContent>
  );
}

HomePage.displayName = 'HomePage';

export default HomePage;
