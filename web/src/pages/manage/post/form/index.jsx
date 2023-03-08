import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// apps
import { retrievePost } from '@src/services/api/post';
import { PRIVATE_PATHS } from '@routes/path';

import LocalSpiner from '@components/comon/local-spiner';
import Form from './form';

function PostFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChangeSuccess = (id, data) => {
    console.log('handle change success', { id, data });
    navigate(PRIVATE_PATHS.post.root);
  };

  const getPost = (id) => {
    if (!id) return;
    setLoading(true);
    retrievePost(id)
      .then(setData)
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getPost(id);
  }, [id]);

  return (
    <div>
      <div className="page-heading">Create/Update Post</div>
      <div className="mt-3">{loading ? <LocalSpiner /> : <Form onChange={handleChangeSuccess} data={data} />}</div>
    </div>
  );
}

PostFormPage.displayName = 'PostFormPage';
export default PostFormPage;
