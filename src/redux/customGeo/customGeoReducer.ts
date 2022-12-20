import { createSlice } from "@reduxjs/toolkit";
import { StateData } from "./state-model";

const initialState: StateData = {
    filter:{
        name: "",
        code: "",
        fromCountryDevision: "",
        toCountryDevision: "",
        isActive:true
    },
    geoData:{}
  };
const CustomGeoReducer = createSlice({
    initialState: initialState,
    name:"customGeo" , 
    reducers:{
        fetchGeoList :(state, action) => {
         state.geoData = action.payload
        },
        clearGeoList: (state)=>{
            state.geoData ={}
        },
        setFilter:(state, action) => {
            state.filter= action.payload
        }
    }

})
export const { fetchGeoList ,clearGeoList ,setFilter } = CustomGeoReducer.actions;
export default CustomGeoReducer.reducer;