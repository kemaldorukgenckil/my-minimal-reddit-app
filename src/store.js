import { configureStore,combineReducers  } from  "@reduxjs/toolkit";
import subRedditsReducer from "./app/features/subRedditSlice" ;
import redditHotPostSlice from "./app/features/redditHotPostSlice";
export default configureStore({
    reducer: combineReducers ({
        subreddits: subRedditsReducer,
        redditHotPosts: redditHotPostSlice
    })
})