import { createSlice } from "@reduxjs/toolkit";
import { getHotPosts } from "../api/reddit";

const initialState = {
    hotPosts: {},
    error: false,
    isLoading: false,
    
}

const redditHotPostSlice = createSlice({
     name:'redditHotPosts',
     initialState,
     reducers: {
        // setPosts:(state,action) {
        //     state.posts = action.payload;
        // },
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
        // setSelectedSubreddit(state, action) {
        //    state.selectedSubreddit = action.payload;
        // }
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

export const { startGetPosts,
    getPostsSuccess,
    getPostsFailed
 } = redditHotPostSlice.actions;
export default redditHotPostSlice.reducer;     

export const selectHotPosts = (state) => state.redditHotPosts.hotPosts;
