import { createSlice } from "@reduxjs/toolkit";
import { StateData } from "./state-model";

const initialState: StateData = {
    filter:{
        name: "",
        code: "",
        fromCountryDevision: "",
        toCountryDevision: "",
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
        }
    }

})
export const { fetchGeoList ,clearGeoList } = CustomGeoReducer.actions;
export default CustomGeoReducer.reducer;