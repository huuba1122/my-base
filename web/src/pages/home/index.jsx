import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { t } from 'ttag';

// antd
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

// recoil
import { localeState } from '@src/recoil/locale';

// hooks
import useDebounce from '@src/shared/hooks/useDebounce';

// ----------------------------------------------------------------
function HomePage() {
  const [locale, setLocale] = useRecoilState(localeState);

  const [filter, setFilter] = React.useState('');
  const filteredPostList = [];

  const [search, setSearch] = React.useState(filter);
  const searchDebounce = useDebounce(search, 500);
  const handlerSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  React.useEffect(() => {
    setFilter(searchDebounce);
  }, [searchDebounce]);

  return (
    <div className="container">
      {t`Home Page`}

      <div>
        {t`Languages`}:
        <GlobalOutlined />
        <Button onClick={() => setLocale('vi')}>VI</Button>
        <Button onClick={() => setLocale('en')}>EN</Button>
      </div>
      <div className="mt-2 p-2">
        <label htmlFor="search-post">
          {t`Search`}:
          <input type="text" id="search-post" value={search} onChange={handlerSearch} placeholder={t`Search post`} />
        </label>
      </div>
      <div className="border-2 mt-2">
        <h2>{t`Post List`}</h2>
        {filteredPostList && filteredPostList.length ? (
          filteredPostList.map((post) => (
            <div className="border-bottom-1 pl-2" key={post.id}>
              <h4>
                {post.id}--{post.title}
              </h4>
              <p>{post.description}</p>
            </div>
          ))
        ) : (
          <span>Chưa có bài viết</span>
        )}
      </div>
    </div>
  );
}

HomePage.displayName = 'HomePage';

export default HomePage;
