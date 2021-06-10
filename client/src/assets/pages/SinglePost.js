import React from 'react';

import Auth from '../utils/auth';

import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_POST } from '../utils/queries';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const SinglePost = props => {

  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <div style={{ marginTop:'25px'}}>
        <div className='card'>
          <p className='title has-text-centered'>
            <Link className="single-post-user" to={`/profile/${post.username}`}>{post.username}</Link>
          </p>
          <p className='subtitle has-text-centered single-post-subtitle' style={{ color:'#F2E9E4' }}>
            posted on {post.createdAt}
          </p>
          
          <div className='card-content'>
            <p  className="title">{post.title}</p>
            <p className='post-text'>{post.postText}</p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        {post.commentCount > 0 && <CommentList comments={post.comments} />}
        {Auth.loggedIn() && <CommentForm postId={post._id} />}
      </div>
    </div>

    
  );
};

export default SinglePost;
