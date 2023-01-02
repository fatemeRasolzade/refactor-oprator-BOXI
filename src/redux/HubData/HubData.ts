import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import {postDataHeaderToServer } from '../../services/Service_call';
import { apiRoute } from '../../services/apiRoute';

const initialState = {
  postLists: [],
  fetchpost: false,
  errorMessage: "",
};

export const HubData = createAsyncThunk("post", async (body:any) => {

  const params = `/filter?pageNumber=${body.pageNumbers}&pageSize=10`;
 
    const data = await  postDataHeaderToServer(
      apiRoute().post.hub + params,
      {
      code: body.code ?  body.code : "",
      name: body.name ? body.name : "",
      hubTypeId: body.hubTypeId.id ? body.hubTypeId.id : "",
      hubCategoryId: body.hubCategoryId.id ? body.hubCategoryId.id : "",
      parentHubId: body.parentHubId.id ? body.parentHubId.id : "",
      isActive:body.isActive
     
      }
    );
    return data
  })
const HubList=createSlice({
    initialState:initialState,
    name:'hubList',
    reducers:{
        clearHub:(state)=>{
            state.postLists=[]
        },
        deleteRow:(state:any,action:any)=>{
        
           state.postLists.payload.content=state.postLists.payload.content.filter((item:any)=>item.id !==action.payload)
        },
        // filterSwitch:(state,action)=>{
        //   if(action.payload===true){
        //    console.log("state",state?.postLists?.payload?.content.filter(item=>item.isActive !==true))
        //   }
         
       
        // }
       
 
    },
   
  

  extraReducers: {
    [HubData.fulfilled as any]: (state, action) => {
      state.postLists = action.payload;
      state.fetchpost = false;
    },
    [HubData.pending as any]: (state) => {
      state.fetchpost = true;
    },
    [HubData.rejected as any]: (state) => {
      state.fetchpost = false;
      state.errorMessage = "wrong";
    },
  },
});

 

export const { clearHub,deleteRow } = HubList.actions;
export default HubList.reducer;
