
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHotPosts,fetchHotPosts } from '../../features/redditHotPostSlice.js';
import HotPost from './hotPost.js';


export default function HotPosts(props) {

  const dispatch = useDispatch();
  const [selectedSubreddit,setSelectedSubreddit] = useState({})
  const { currentSubredditDisplayname, currentSubredditUrl  } = props;
  
  console.log(currentSubredditDisplayname);
  
  
  useEffect(() => {
      setSelectedSubreddit({ displayName : currentSubredditDisplayname, url : currentSubredditUrl });
  },[]);

  useEffect(( ) => {
    dispatch(fetchHotPosts(selectedSubreddit.url));
  },[dispatch, fetchHotPosts, selectedSubreddit.url]);

  const hotPosts = useSelector(selectHotPosts);
 


  return (
    <>
      <p>Hot Posts for {currentSubredditDisplayname}</p>
      {
        hotPosts.map(post => (
          <HotPost key={post.id} post={post} />
        ))
      }

    </>
  );
}
