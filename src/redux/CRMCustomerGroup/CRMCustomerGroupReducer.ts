import { createSlice } from "@reduxjs/toolkit";
import { StateData } from "./state-model";

const initialState: StateData = {
    filter:{
        name: "",
        code: "",
        description: "",
        segmentCustomers: {
            id:"",
            customerId:""
        },
        isActive:true
    },
    crmCustomerData:{}
  };
const CustomGeoReducer = createSlice({
    initialState: initialState,
    name:"crmCustomer" , 
    reducers:{
        fetchCRMCustomer :(state, action) => {
         state.crmCustomerData = action.payload
        },
        clearCRMCustomer: (state)=>{
            state.crmCustomerData ={}
        },
        setFilter:(state, action) => {
            state.filter= action.payload
        }
    }

})
export const { fetchCRMCustomer ,clearCRMCustomer ,setFilter } = CustomGeoReducer.actions;
export default CustomGeoReducer.reducer;