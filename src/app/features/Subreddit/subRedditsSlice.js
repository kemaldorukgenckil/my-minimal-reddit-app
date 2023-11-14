import { createSlice, createAsyncThunk } from 'react-redux';
import { getSubreddits } from '../../api/reddit';

const subredditsSliceOptions = {
   name:'subreddits',
   initialState: {
     subreddits: []
   },
   reducers: {
      getSubredditsSuccess(state, action){
          state.subreddits = action.payload;
      } 
   }

} 


export const fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () =>{
   const subreddits = await getSubredditsSuccess();
   dispatch(subreddits);
});

const subredditsSlice = createSlice(subredditsSliceOptions);


export const { getSubreddits } = subredditsSlice.reducers;

