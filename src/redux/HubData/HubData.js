import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { PostDataParams,postDataHeaderToServer } from './../../services/Service_call';
import { apiRoute } from './../../services/apiRoute';

const initialState = {
  postLists: [],
  
  fetchpost: false,
  errorMessage: null,
};

export const HubData = createAsyncThunk("post", async (page) => {
  const params = `/filter?pageNumber=${page}&pageSize=10`;
  const data = postDataHeaderToServer(
    apiRoute().post.hub + params,
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
    }
  );
  })
const HubList=createSlice({
    initialState:initialState,
    name:'hubList',
    reducers:{
        clearHub:(state)=>{
            state.postLists=[]
        },
        deleteRow:(state,action)=>{
        
           state.postLists.payload.content=state.postLists.payload.content.filter(item=>item.id !==action.payload)
        },
        filterSwitch:(state,action)=>{
          if(action.payload===true){
           console.log("state",state?.postLists?.payload?.content.filter(item=>item.isActive !==true))
          }
         
       
        }
       
 
    },
    deleteRow: (state, action) => {
      state.postLists.payload.content = state.postLists.payload.content.filter((item) => item.id !== action.payload);
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

 

export const { clearHub,deleteRow,filterSwitch } = HubList.actions;
export default HubList.reducer;
