import React from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

// app
import { retrievePublicPost } from '@services/api/post';
import LocalSpiner from '@src/components/comon/LocalSpiner';
import UserAvatar from '@components/comon/UserAvatar';

// css
import styles from './main.module.scss';

// ----------------------------------------------------------------
const PostDetail = () => {
  const { slug } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [post, setPost] = React.useState({});

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
    <div>
      <div className={styles.postBanner}>
        <img src={post.banner || 'https://picsum.photos/seed/picsum/1000/600'} alt="banner" />
      </div>
      <div className={styles.extraInfo}>
        <div className="avatar author-avatar">
          <UserAvatar label={post.author?.full_name} />
        </div>
        <div>
          <p>{post.author?.full_name}</p>
          <p className="text-secondary small-text">{dayjs(post.created_at).format('MMMM DD/YYYY')}</p>
        </div>
      </div>

      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
};

PostDetail.defaultProps = {};

PostDetail.displayName = 'PostDetail';
export default PostDetail;
