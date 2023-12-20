import { createSlice } from "@reduxjs/toolkit";

import { getHotPosts, getCommentsForPost, getAuthor } from "../api/reddit";



const initialState = {
    hotPosts: {},
    error: false,
    isLoading: false,
    commentsForPosts: [],
    commentsIsLoading: false,
    commentsError: false,
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
            state.commentsForPosts = action.payload;
            state.commentsIsLoading = false;
        },
        getCommentsForPostFailed(state) {
            state.commentsIsLoading = false;
            state.commentsError = true;
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
        }


    }
})


// This is a Redux Thunk that gets posts from a subreddit.
export const fetchHotPosts = (subreddit) => {
    return async (dispatch) => {
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
            console.log(comments);
            dispatch(getCommentsForPostSuccess(comments));
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
           console.log(author);
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
    getAuthorFailed
} = redditHotPostSlice.actions;
export default redditHotPostSlice.reducer;

export const selectAuthor = (state) => state.redditHotPosts.authorForHotPost
export const getSelectedHotPost = (state) => state.redditHotPosts.selectedHotPost
export const selectComments = (state) => state.redditHotPosts.commentsForHotPost
export const selectHotPosts = (state) => state.redditHotPosts
