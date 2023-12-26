
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHotPosts, fetchHotPosts } from '../../features/redditHotPostSlice.js';
import HotPost from './hotPost.js';


export default function HotPosts(props) {

  const dispatch = useDispatch();

  const { currentSubredditDisplayname, currentSubredditUrl, currentSubredditName} = props;
  const hotPosts = useSelector(selectHotPosts);
 
  
  console.log("hotPosts re-render");


  

  useEffect(() => {
    dispatch(fetchHotPosts(currentSubredditUrl));
  },[dispatch, currentSubredditUrl]);

  



  return (
    <>
     <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Hot Posts for {currentSubredditDisplayname}</p>
      {
        !hotPosts.error && !hotPosts.isLoading ? (
         
          hotPosts.hotPosts && Array.isArray(hotPosts.hotPosts) && hotPosts.hotPosts.length > 0 ? (
            hotPosts.hotPosts.slice().sort((a,b) => b.num_comments - a.num_comments).map((hotPost, index) => (
              <HotPost key={index} post={hotPost} currentSubredditDisplayname={currentSubredditDisplayname} currentSubredditName={currentSubredditName}  />
            ))
          ) : (
            <div>
              <p>No hot posts available.</p>
            </div>
          )
        ) : (
          
          hotPosts.isLoading && !hotPosts.error ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            !hotPosts.isLoading && hotPosts.error ? (
              <div>
                <p>Post is not loaded. Error: {hotPosts.error}</p>
              </div>
            ) : (
              <div>
                <p>Unexpected error occurred.</p>
                
              </div>
            )
          )
        )
      }
    </>
  );

  
}