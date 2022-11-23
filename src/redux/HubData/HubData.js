import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { PostDataParams } from './../../services/Service_call';
import { apiRoute } from './../../services/apiRoute';



const initialState = {
  postLists: [],
  fetchpost: false,
  errorMessage: null,
};

export const HubData=createAsyncThunk('post',async(page)=>{
    const params=`/filter?pageNumber=${page}&pageSize=10`
    const data=await PostDataParams(apiRoute().post.hub + params,{})
   
     return data
   
})

const HubList=createSlice({
    initialState:initialState,
    name:'hubList',
    reducers:{
        clearHub:(state)=>{
            state.postLists=[]
        }
    },
  
  extraReducers: {
    [HubData.fulfilled]: (state, action) => {
      state.postLists = action.payload;
      state.fetchpost = false;
    },
    [HubData.pending]: (state) => {
      state.fetchpost = true;
    },
    [HubData.rejected]: (state) => {
      state.fetchpost = false;
      state.errorMessage = "wrong";
    },
  },
});
export const { clearHub } = HubList.actions;
export default HubList.reducer;
