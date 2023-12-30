import { createSlice } from "@reduxjs/toolkit";

import { getHotPosts, getCommentsForPost, getAuthor } from "../api/reddit";



const initialState = {
    hotPosts: {},
    error: false,
    isLoading: false,
    commentsForPost: [],
    commentsIsLoading: false,
    commentsError: false,
    authorCommentForPost: {},
    selectedHotPost: {},
    authorForHotPost: {},
    authorIsLoading: false,
    authorError: false

}

const redditHotPostSlice = createSlice({
    name: 'redditHotPosts',
    initialState,
    reducers: {
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.hotPosts = action.payload;
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        startGetCommentsForPost(state) {
            state.commentsIsLoading = true;
            state.commentsError = false;
        },
        getCommentsForPostSuccess(state, action) {
            state.commentsForPost = action.payload;
            state.commentsIsLoading = false;
        },
        getCommentsForPostFailed(state) {
            state.commentsIsLoading = false;
            state.commentsError = true;
        },
        setAuthorCommentForPost(state, action) {
            state.authorCommentForPost = action.payload;
        },
        setSelectedHotPost(state, action) {
            state.selectedHotPost = action.payload;
        },
        startAuthorForPost(state) {
            state.authorIsLoading = true;
            state.authorError = false;
        },
        getAuthorForHotPost(state, action) {
            state.authorForHotPost = action.payload;
            state.authorIsLoading = false;
        },
        getAuthorFailed(state) {
            state.authorIsLoading = false;
            state.authorError = true;
        },
        resetState(state) {
            return initialState;
        }
        


    }
})


// This is a Redux Thunk that gets posts from a subreddit.
export const fetchHotPosts = (subreddit) => {
    return async (dispatch) => {
        dispatch(resetState());
        try {
            dispatch(startGetPosts());
            const hotPosts = await getHotPosts(subreddit);
            dispatch(getPostsSuccess(hotPosts));
        } catch (error) {
            dispatch(getPostsFailed());
        }
    };
}

export const fetchComments = (permalink) => {
    return async (dispatch) => {
        
        try {
            dispatch(startGetCommentsForPost())
            const comments = await getCommentsForPost(permalink);
            dispatch(setAuthorCommentForPost({ 
                title: comments[0].data.children[0].data.title,
                selftext: comments[0].data.children[0].data.selftext,
                image: comments[0].data.children[0].data.url
             }));
            dispatch(getCommentsForPostSuccess(comments[1].data.children.map((comment) => comment.data)));
        } catch (error) {
            dispatch(getCommentsForPostFailed());
        }

    }
};

export const fetchAuthor = (user) => {
    return async (dispatch) => {
        try {
           dispatch(startAuthorForPost());
           const author = await getAuthor(user);
           dispatch(getAuthorForHotPost(author)); 
        }catch (error) {
           dispatch(getAuthorFailed());     
        }
    }
};

export const { startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    startGetCommentsForPost,
    getCommentsForPostSuccess,
    getCommentsForPostFailed,
    setSelectedHotPost,
    startAuthorForPost,
    getAuthorForHotPost,
    getAuthorFailed,
    setAuthorCommentForPost,
    resetState
} = redditHotPostSlice.actions;
export default redditHotPostSlice.reducer;

export const selectAuthor = (state) => state.redditHotPosts.authorForHotPost
export const getSelectedHotPost = (state) => state.redditHotPosts.selectedHotPost
export const selectComments = (state) => state.redditHotPosts.commentsForPost
export const selectHotPosts = (state) => state.redditHotPosts
