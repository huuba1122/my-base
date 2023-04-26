import React from 'react';
import { t } from 'ttag';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

// antd
import { Divider } from 'antd';

// app
import { retrievePublicPost } from '@services/api/post';
import LocalSpiner from '@src/components/comon/LocalSpiner';
import UserAvatar from '@components/comon/UserAvatar';

import MainContent from '../main';
import LeftBar from '../main/LeftBar';
import { RelatedList } from '../related';

// css
import styles from './main.module.scss';

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

// ----------------------------------------------------------------
const PostDetail = () => {
  const { slug } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [post, setPost] = React.useState({});

  const { author = {}, related_posts: relatedPosts = [] } = post;

  React.useEffect(() => {
    retrievePublicPost(slug)
      .then(setPost)
      .catch((error) => {
        console.log('retrieve post error', error);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LocalSpiner />;

  return (
    <MainContent left={<LeftBar />}>
      <div className={styles.postWrapper}>
        <div className={styles.content}>
          <div className={styles.postBanner}>
            <img src={post.banner || 'https://picsum.photos/seed/picsum/1000/600'} alt="banner" />
          </div>
          <div className={styles.extraInfo}>
            <div className="avatar author-avatar">
              <UserAvatar label={author.full_name} />
            </div>
            <div>
              <p>{author.full_name}</p>
              <p className={styles['small-text']}>{dayjs(post.created_at).format('MMM DD/YYYY')}</p>
            </div>
          </div>

          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postBody} dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
        <div className={styles.rightContent}>
          <div className={styles.authorProfile} style={{ '--border-top-color': `#${randomColor}` }}>
            <div className={styles.authorHeader}>
              <div className={styles.authorAvatar}>
                <UserAvatar label={author.full_name} size={48} />
              </div>
              <div>
                <span className="bold">{author.full_name}</span>
                <span className="text-secondary small-text">
                  Joined {dayjs(author.created_at).format('MMM DD/YYYY')}
                </span>
              </div>
            </div>
            <Divider />
            <RelatedList items={relatedPosts} title={t`More from ${author.full_name}`} />
          </div>
        </div>
      </div>
    </MainContent>
  );
};

PostDetail.defaultProps = {};

PostDetail.displayName = 'PostDetail';
export default PostDetail;
