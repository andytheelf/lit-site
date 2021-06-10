import React from 'react';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
// import Auth from '../utils/auth';
import Feed from '../components/MainFeed';
// import PostForm from '../components/PostForm';
// import FollowerList from '../components/FollowerList';


const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_POSTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
 const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const followers= userData?.me.followers
  const posts = data?.posts || [];
  
  console.log(userData)
  // console.log(posts);
 

  // const loggedIn = Auth.loggedIn();

  return (
    
  <main id="home-body">
      <div className="flex-row justify-space-between">
      {/* {loggedIn && (
          <div className="col-12 mb-3">
            <PostForm />
          </div>
        )} */}
       
  {loading ? (
    <progress className="progress is-medium is-dark" max="100">Loading</progress>
  ) : (
   
    <Feed 
    posts={posts} 
   userData={userData}
    />
    
  )}
</div>
{/* {loggedIn && userData ? (
 
    <FollowerList
      username={userData.me.username}
      followerCount={userData.me.followerCount}
      followers={userData.me.followers}
    />

) : null}
     */}
    </main>
  );
};

export default Home;
