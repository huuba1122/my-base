import React from 'react';
import { t } from 'ttag';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// antd
import { Input } from 'antd';

// app
import { filterPostSt } from '@recoil/post';

const { Search } = Input;
const pathRoot = '/';

// ----------------------------------------------------------------
const SearchPost = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [filterState, setSearchFilter] = useRecoilState(filterPostSt);

  const { search } = filterState;

  const onSearch = (value) => {
    setSearchFilter({ ...filterState, search: value, page: 1 });
    if (pathname !== pathRoot) navigate(pathRoot);
  };

  return (
    <Search
      defaultValue={search}
      placeholder={t`search post`}
      onSearch={onSearch}
      style={{
        minWidth: 150,
        display: 'flex',
        alignItems: 'center'
      }}
    />
  );
};
export default SearchPost;
