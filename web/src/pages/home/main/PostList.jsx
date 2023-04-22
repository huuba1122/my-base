import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { PUBLIC_PATHS } from '@routes/path';

import ElipsisText from '@components/comon/table/ellipsis-text';

// ----------------------------------------------------------------
PostItem.propTypes = {
  item: PropTypes.object
};

PostItem.defaultProps = {
  item: {}
};

function PostItem({ item }) {
  return (
    <Link to={PUBLIC_PATHS.post.detail.replace(':slug', item.slug)} className="post-item text-primary">
      {/* <div className="post-item"> */}
      {/* {item?.banner ? ( */}
      <div className="post-banner">
        <img src={item.banner || 'https://picsum.photos/seed/picsum/1000/600'} alt="post's banner" />
      </div>
      {/* ) : (
        <div className="post-banner default-banner" />
      )} */}
      <div className="post-info">
        <h2 className="post-title">Title: {item.title}</h2>
        <div className="post-des">
          <ElipsisText>
            <p>{item.description}</p>
          </ElipsisText>
        </div>
        <ul className="extra-info text-white">
          <li>{item.author?.full_name || 'Mr Black'}</li>
          <li>{item.createdAt || dayjs().format('MMMM DD/YYYY')}</li>
        </ul>
      </div>
      {/* </div> */}
    </Link>
  );
}

PostList.propTypes = {
  items: PropTypes.array
};

PostList.defaultProps = {
  items: []
};

function PostList({ items }) {
  return (
    <div className="post-list">
      {items?.length ? (
        items.map((item) => <PostItem key={item.id} item={item} />)
      ) : (
        <div className="no-post">{t`No post founded`}</div>
      )}
    </div>
  );
}

PostList.displayName = 'PostList';
export default PostList;
