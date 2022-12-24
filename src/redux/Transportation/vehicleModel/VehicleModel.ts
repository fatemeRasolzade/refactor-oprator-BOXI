import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const vehicleModel=createAsyncThunk('vehicleModelLists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.VehicleModel + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
})

const initialState:any= {
    vehicleModelLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const VehicleModelLists= createSlice({
    initialState: initialState,
    name: "vehicleModelLists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [vehicleModel.fulfilled as any]: (state, action) => {
            state.vehicleModelLists = action.payload.payload;
            state.fetchPost = false;
        },
        [vehicleModel.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [vehicleModel.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default VehicleModelLists.reducer