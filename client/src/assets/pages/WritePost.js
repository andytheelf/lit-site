import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_POST } from '../utils/mutations';


import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

const PostForm = () => {
  
  // const [postText, setText] = useState('');
  const [formState, setFormState] = useState({ title: '', postText: ''});
  const [characterCount, setCharacterCount] = useState(0);
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { posts } = cache.readQuery({ query: QUERY_POSTS });
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] }
        });
       
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } }
      });
    }
  });

  const handleChange = event => {
    // if (event.target.value.length <= 1000) {
    
    //   setText(event.target.value);
  setCharacterCount(event.target.value.length);
   
    // }
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
        const { data } = await addPost({
        variables: { ...formState}
      });
      document.location.replace('/')
      console.log(data)
     setFormState('')
    //   setText('');
    //   setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 1000 || error ? 'text-danger' : ''}`}>
        Character Count: {characterCount}/1000
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
          <input className="input field" 
          name="title"
          type="text"
          placeholder="Title"
           value={formState.title}
           onChange={handleChange}
          ></input>
        <textarea
          placeholder="Body..."
          value={formState.postText}
          type="text"
          name="postText"
          className="textarea field"
          rows="17"
          onChange={handleChange}
        ></textarea>
        <button className="button" type="submit" >
           Finalize you work
        </button>
      </form>
    </div>
  );
};

export default PostForm;