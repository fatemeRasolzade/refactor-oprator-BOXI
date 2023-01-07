import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const vendorData=createAsyncThunk('vendorLists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.filterVendor + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
})



export interface StateData {
    vendorLists: Array<any>;
    fetchPost?: boolean;
    errorMessage: null | string;
    isUpdating: Boolean;
    filter: object;
  }
  

const initialState:StateData= {
    vendorLists:[],
    fetchPost:false,
    errorMessage:null,
    isUpdating: false,
    filter:{}    
}

const VendorList = createSlice({
    initialState: initialState,
    name: "vendorLists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
          setFilter: (state, action) => {
            state.filter = action.payload;
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

export const {  setFilter } = VendorList.actions;
export default VendorList.reducer