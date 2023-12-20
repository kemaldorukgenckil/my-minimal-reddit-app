import React, { useEffect } from 'react'
import {
    getSelectedHotPost,
    fetchComments,
    fetchAuthor,
    selectAuthor,
    selectComments,
    selectHotPosts
} from '../../features/redditHotPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

export default function HotPostDetail() {
    let { id, post } = useParams();
    const selectedHotPost = useSelector(getSelectedHotPost);
    const author = useSelector(selectAuthor);
    const comments = useSelector(selectComments);
    const hotPosts = useSelector(selectHotPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthor(selectedHotPost.author));
        dispatch(fetchComments(selectedHotPost.permalink));
        
    }, [dispatch, selectedHotPost]);


    return (
        <div className='hotpost-detail-container'>
            <div className="flex-items">
                <img className="avatar" src={author.avatar} alt="User Avatar" />
                <h2>Author: {author.name}</h2>
                <p>Total Karma: {author.totalKarma}</p>
            </div>
            <div className="flex-items">
                <h1> Comments  </h1>
                {!hotPosts.commentsIsLoading && !hotPosts.commentsError ? (

                    hotPosts.comments && Array.ısArray(hotPosts.comments) && hotPosts.comments.length > 0 ? (
                        comments.map(comment => (
                            <ul key={comment.id}>
                                <li>
                                    <p>{comment.body}</p>
                                    <span>Score: {comment.score}</span> <span>{comment.author}</span>
                                </li>

                            </ul>
                        ))
                    ) : (
                        <div>No comments available </div>
                    )
                ) : (
                    !hotPosts.commentsIsLoading && hotPosts.commentsError ? (
                        <div>Comments are not loaded {hotPosts.commentsError}   </div>
                    ) : (
                        <p>Unexpected error occurred.</p>
                    )
                )
                }


            </div>
            <div className="flex-items"> post name : {post}</div>
        </div>
    )
}
