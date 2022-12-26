import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { postDataHeaderToServer } from './../../services/Service_call';
import { apiRoute } from './../../services/apiRoute';


export const ServiceData=createAsyncThunk('servicelist',async(body:any)=>{
    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.serviceDefine + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
    })



const initialState:any= {
    postLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,
    
}

const ServiceDefineList = createSlice({
    initialState: initialState,
    name: "servicelist",
    reducers: {
        updating: (state, action) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [ServiceData.fulfilled as any]: (state, action) => {
            state.postLists = action.payload.payload;
            state.fetchPost = false;
        },
        [ServiceData.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [ServiceData.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

export const {  updating } = ServiceDefineList.actions;
export default ServiceDefineList.reducer