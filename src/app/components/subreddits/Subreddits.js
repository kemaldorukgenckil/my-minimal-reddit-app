import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddits, fetchSubreddits,setCurrentSubreddit } from "../../features/subRedditSlice";
import { Link } from "react-router-dom";
import logo from "./reddit-logo.png"





const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    console.log(subreddits);
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);
    
    
    
    return (
        <div className="subreddits-container">
            <h1>Subreddits</h1>
            <ul>

                {subreddits.map(subreddit => (
                      
                    <li key={subreddit.id}>
                        <Link to={`/subreddits/${subreddit.name}`}>
                        <button type="button " onClick={ () => dispatch(setCurrentSubreddit({subredditDisplayname:subreddit.display_name, subredditImg:subreddit.icon_img, subredditUrl:subreddit.url,subredditName:subreddit.name }))  }>
                            <img
                                src={subreddit.icon_img || logo}
                                alt={`${subreddit.display_name}`}
                                className="subreddit-icon"
                                style={{ border: `3px solid ` }}

                            />

                            
                                {` ${subreddit.display_name}`}
                         </button>
                        </Link>
                    </li>

                ))}
            </ul>

        </div>
    );
}

export default Subreddits;