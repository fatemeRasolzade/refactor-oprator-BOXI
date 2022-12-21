import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { apiRoute } from "../../services/apiRoute"
import { postDataHeaderToServer } from "../../services/Service_call"
export const ServiceProvisionData=createAsyncThunk('ServiceProvision',async(page:number)=>{
    const params=`/filter?pageNumber=${page}&pageSize=10`
    const {payload}=await postDataHeaderToServer(apiRoute().post.service_provision + params,{})
    console.log("payload",payload)
    return payload
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
      clearService:(state)=>{
        state.serviceList=[]
      }
     
    },
    extraReducers:{
        [ServiceProvisionData.fulfilled as any]: (state, action) => {
            state.serviceList = action.payload;
            state.fetchPost = false;
          },
          [ServiceProvisionData.pending as any]: (state) => {
            state.fetchPost = true;
          },
          [ServiceProvisionData.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
          },
    }
})
export const {clearService}=serviceProvision.actions
export default serviceProvision.reducer