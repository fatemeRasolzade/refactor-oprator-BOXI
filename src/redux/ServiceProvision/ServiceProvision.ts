import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { apiRoute } from "../../services/apiRoute"
import { postDataHeaderToServer } from "../../services/Service_call"
export const ServiceProvisionData=createAsyncThunk('ServiceProvision',async(body:any)=>{
    const params=`/filter?pageNumber=${body.pageNumbers}&pageSize=10`
    const {payload}=await postDataHeaderToServer(apiRoute().post.service_provision + params,
    {
     code:body.code ? body.code : "",
        type:body.type ? body.type :{
            id: 0,
            text: "ثابت"
        },
        name:body.name ? body.name : "",
        description:"",
        validDateFrom:{
           day: "",
           month: "",
           year: ""
           },
        validDateTo:{
           day: "",
           month: "",
           year: ""
           },
        deliveryDiscounts:[],
        service:body.service ? body.service : null,
        customerSegments:body.customerSegments ? body.customerSegments :null,
        serviceDeliveryCustomers:body.serviceDeliveryCustomers ? body.serviceDeliveryCustomers : null,
        saleschannels:body.saleschannels ? body.saleschannels : null,
        discountPercent:body.discountPercent ? body.discountPercent : "",
        isActive:body.isActive ? body.isActive : true
})
  
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