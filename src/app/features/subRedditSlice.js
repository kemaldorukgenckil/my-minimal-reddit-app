import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';
import subredditMockData from '../mock/subredditsMock';

const subredditsSliceOptions = {
  name: 'subreddits',
  initialState: {
    subreddits: [],
    error: false,
    isLoading: false,
    currentSubreddit: {
                              
    }

  },
  reducers: {
    startGetSubreddits(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    setCurrentSubreddit(state, action) {
      state.currentSubreddit = action.payload;
    }

  },
};

export const subredditsSlice = createSlice(subredditsSliceOptions);
export const { getSubredditsSuccess, startGetSubreddits, getSubredditsFailed, setCurrentSubreddit } = subredditsSlice.actions;
// This is a Redux Thunk that gets subreddits
export const fetchSubreddits = () => {
  return async (dispatch) => {
    try {
      dispatch(startGetSubreddits());
      const subreddits = await getSubreddits();
      dispatch(getSubredditsSuccess(subreddits));

    } catch (error) {
      dispatch(getSubredditsFailed());
    }
  };
}
export default subredditsSlice.reducer;


export const selectSubreddits = (state) => state.subreddits.subreddits;
export const getCurrentSubreddit = (state) => state.subreddits.currentSubreddit;
