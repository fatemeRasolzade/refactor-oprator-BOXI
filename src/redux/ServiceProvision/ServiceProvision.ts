import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const serviceProvisionData=createAsyncThunk('post',async(page)=>{
    const params=`/filter?pageNumber=${page}&pageSize=10`
    //const data=await PostDataParams(apiRoute().post.hub + params,{})
     //return data
   
})

export interface StateData {
    serviceList: Array<any>;
    fetchPost: boolean;
    errorMessage: null | string;
    isUpdating: Boolean;
  }


const initialState:StateData={
serviceList:[],
fetchPost:false,
errorMessage:"",
isUpdating: false
}

const serviceProvision =createSlice({
    name:"serviceProvision",
    initialState:initialState,
    reducers:{

    },
    extraReducers:{
        [serviceProvisionData.fulfilled as any]: (state, action) => {
            state.serviceList = action.payload;
            state.fetchPost = false;
          },
          [serviceProvisionData.pending as any]: (state) => {
            state.fetchPost = true;
          },
          [serviceProvisionData.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
          },
    }
})
//export {}=serviceProvision.actions
export default serviceProvision.reducer