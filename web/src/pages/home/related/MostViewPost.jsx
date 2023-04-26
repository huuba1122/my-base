import React from 'react';
import { t } from 'ttag';

import { fetchMostViewPosts } from '@services/api/post';

import LocalSpiner from '@components/comon/LocalSpiner';
import { RelatedList } from './RelatedPost';

// css
import styles from './main.module.scss';

export const MostViewPost = () => {
  const title = t`Most view posts`;
  const [loading, setLoading] = React.useState(false);
  const [mostViewPosts, setMostViewPosts] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetchMostViewPosts()
      .then(setMostViewPosts)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LocalSpiner />;

  return (
    <div className={styles.mostViewList}>
      <RelatedList items={mostViewPosts} title={title} />
    </div>
  );
};
