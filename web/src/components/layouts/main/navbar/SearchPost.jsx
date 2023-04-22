import React from 'react';
import { t } from 'ttag';

import { Input } from 'antd';

const { Search } = Input;

const SearchPost = () => {
  const onSearch = (value) => console.log(value);

  return (
    <Search
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
