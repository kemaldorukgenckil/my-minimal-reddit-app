import React  from 'react';
import { useDispatch } from 'react-redux';
import { FaRedditSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { setSelectedHotPost } from '../../features/redditHotPostSlice';

export default function HotPost(props) {
  const { post, currentSubredditName } = props;
  const dispatch = useDispatch();
  

  





  return (
    <div className='hotpost'>
      <Link to={`/subreddits/${currentSubredditName}/${post.name}`}  className="linkWithoutUnderline">
        <button type="button" onClick={ () => dispatch(setSelectedHotPost({ permalink:post.permalink, author:post.author }))} >
          <h3>{post.title}</h3>
          <h4>{`Posted by ${post.author}   Total comments: ${post.num_comments} `}</h4>
        </button>
      </Link>

      <a href={post.url} title="goes to the post">
        <FaRedditSquare />
      </a>
    </div>
  );
}
