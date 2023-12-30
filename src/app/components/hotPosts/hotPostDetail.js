import React, { useEffect } from 'react'
import {
    getSelectedHotPost,
    fetchComments,
    fetchAuthor,
    selectAuthor,
    selectHotPosts
} from '../../features/redditHotPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import userlogo from "./reddit-default-user.png"

export default function HotPostDetail() {
    let { id, post } = useParams();
    const selectedHotPost = useSelector(getSelectedHotPost);
    const author = useSelector(selectAuthor);



    const hotPosts = useSelector(selectHotPosts);
    const dispatch = useDispatch();


    

    
    useEffect(() => {
        dispatch(fetchAuthor(selectedHotPost.author));
        dispatch(fetchComments(selectedHotPost.permalink));
    }, [dispatch, selectedHotPost.author, selectedHotPost.permalink]);
    
       



    console.log(`post detail ${post} and ${id}`);
    return (
        <div className='hotpost-detail-container'>

            <div className="flex-items">
                <img
                    className="avatar"
                    src={ author.avatar && author.avatar.endsWith('.png') ? author.avatar : userlogo}
                    alt='Author profile'

                />
                <h2>Author: {author.name}</h2>
                <p>Total Karma: {author.totalKarma}</p>
            </div>
            <div className='flex-items'>
                <div className={`selftext ${ hotPosts.authorCommentForPost && 
                                             hotPosts.authorCommentForPost.image &&
                                              !hotPosts.authorCommentForPost.image.endsWith('.png') &&
                                              !hotPosts.authorCommentForPost.image.endsWith('.jpg') &&
                                              !hotPosts.authorCommentForPost.image.endsWith('.jpeg')
                                             ? 'no-image' : ''
                                            }`}>
                    <img src={hotPosts.authorCommentForPost.image} alt="post" />
                    <div className='selfanswer'>
                        <h4>{hotPosts.authorCommentForPost.title}</h4>
                        <span>{hotPosts.authorCommentForPost.selftext}</span>
                    </div>
                </div>
                {!hotPosts.commentsIsLoading && !hotPosts.commentsError ? (
                    <div>
                        <h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Comments  </h5>

                        {hotPosts.commentsForPost && Array.isArray(hotPosts.commentsForPost) && hotPosts.commentsForPost.length > 0 ? (
                            hotPosts.commentsForPost.map((comment, key) => (

                                <div className='comment' key={key}>

                                    <p>{comment.body}</p>
                                    <span>Score: {comment.score}</span> <span>Writer: {comment.author}</span>

                                </div>
                            ))
                        ) : (
                            <div>No comments available </div>
                        )}
                    </div>
                ) : (
                    !hotPosts.commentsIsLoading && hotPosts.commentsError ? (
                        <div>Comments are not loaded {hotPosts.commentsError} </div>
                    ) : (
                        <p>Loading ... </p>
                    )
                )}

            </div>

        </div>
    )
}
