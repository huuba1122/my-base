import React from 'react';
import { t } from 'ttag';
import { useRecoilValue, useRecoilState } from 'recoil';

// apps
import LocalSpiner from '@src/components/comon/LocalSpiner';
import { fetchPublicPosts } from '@src/services/api/post';
import { filterPostSt, publicPostSt } from '@recoil/post';

// import useDebounce from '@src/shared/hooks/useDebounce';
import PostList from './main/PostList';
import { data } from './data';
import './main.scss';

// ----------------------------------------------------------------
function HomePage() {
  const filterPost = useRecoilValue(filterPostSt);
  const [loading, setLoading] = React.useState(false);
  const [postState, setPostState] = useRecoilState(publicPostSt);

  const { items = [...data] } = postState;
  const [page, setPage] = React.useState(1);

  const getListPosts = (params) => {
    setLoading(true);
    fetchPublicPosts(params)
      .then((res) => {
        setPostState(res);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getListPosts({ page, search: filterPost });
  }, [page, filterPost]);

  return (
    <div className="container">
      {loading ? <LocalSpiner /> : <PostList items={items} />}
      <div className="left-content">Related posts</div>
    </div>
  );
}

HomePage.displayName = 'HomePage';

export default HomePage;
