import React from 'react'
import { getCurrentSubreddit } from '../../features/subRedditSlice';
import { useSelector } from 'react-redux';
import HotPosts from '../hotPosts/hotPosts';




const Subreddit = () => {
    
  
  
    const currentSubreddit = useSelector(getCurrentSubreddit)
  
    return (

    <div className='subreddit-page'>
      <div className="subreddit">

        <h3 className="subreddit-title">{currentSubreddit.subredditUrl}</h3>
        <img src={currentSubreddit.subredditImg} alt={currentSubreddit.subredditDisplayname} />
        <h2 >{currentSubreddit.subredditDisplayname} </h2>
        
        
      </div>
      <div className='hotposts'>
         { <HotPosts currentSubredditDisplayname={currentSubreddit.subredditDisplayname} currentSubredditUrl={currentSubreddit.subredditUrl}  /> } 
      </div>
    </div>



  )
}

export default Subreddit;
