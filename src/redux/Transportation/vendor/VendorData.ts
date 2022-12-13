import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const vendorData=createAsyncThunk('vendorLists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.filterVendor + params, {
        ...body
        },{
            headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
          });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
})

const initialState:any= {
    vendorLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const VendorList = createSlice({
    initialState: initialState,
    name: "vendorLists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [vendorData.fulfilled as any]: (state, action) => {
            state.vendorLists = action.payload.payload;
            state.fetchPost = false;
        },
        [vendorData.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [vendorData.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default VendorList.reducer