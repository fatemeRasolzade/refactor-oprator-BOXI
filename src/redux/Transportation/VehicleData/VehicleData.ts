import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";



export const filterVehicleModel=createAsyncThunk('vehicleData',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.Vehicle + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
})

const initialState:any= {
    vehicleData:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const VehicleLists= createSlice({
    initialState: initialState,
    name: "vehicleData",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterVehicleModel.fulfilled as any]: (state, action) => {
            state.vehicleData = action.payload.payload;
            state.fetchPost = false;
        },
        [filterVehicleModel.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterVehicleModel.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default VehicleLists.reducer