import React from 'react';
import { useRecoilState } from 'recoil';
// recoil state
import { postListState } from '@src/recoil/post';

import './index.css';

let newId = 0;
function Post() {
  const [postList, setPostList] = useRecoilState(postListState);

  // state
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div className="post">
      <div className="border-2 mt-2">
        <h2>Post List</h2>
        {postList && postList.length ? (
          postList.map((post) => (
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

Post.displayName = 'Post';
export default Post;
