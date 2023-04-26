import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PUBLIC_PATHS } from '@routes/path';

import ElipsisText from '@components/comon/table/ellipsis-text';

// css
import styles from './main.module.scss';

// ----------------------------------------------------------------
export const RelatedItem = ({ item }) => {
  return (
    <Link to={PUBLIC_PATHS.post.detail.replace(':slug', item.slug)} className={styles.relatedItem}>
      <h4 className={styles.relatedTitle}>{item.title}</h4>
      <div className={styles.relatedDes}>
        <ElipsisText>
          <p>{item.description}</p>
        </ElipsisText>
      </div>
    </Link>
  );
};

RelatedItem.displayName = 'RelatedItem';
RelatedItem.propTypes = {
  item: PropTypes.object
};

RelatedItem.defaultProps = {
  item: {}
};

// ----------------------------------------------------------------
export const RelatedList = ({ items, title }) => {
  return (
    <div className={styles.relatedList}>
      <h2>{title}</h2>
      <div>{!!items.length && items.map((item, index) => <RelatedItem item={item} key={index} />)}</div>
    </div>
  );
};

RelatedList.displayName = 'RelatedList';
RelatedList.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string
};

RelatedList.defaultProps = {
  items: [],
  title: t`Related posts`
};
