import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { PostDataParams } from './../../services/Service_call';
import { apiRoute } from './../../services/apiRoute';


export const ServiceData=createAsyncThunk('servicelist',async(body:any)=>{
    const params = `/filter?pageNumber=1&pageSize=20`;
    var data = {};
    try {
        data = await PostDataParams(apiRoute().post.serviceDefine + params, body?body:{
            code: "",
            name: "",
            isActive: true,
        });
    } catch (error) {
        console.log("error ", error);
    }
    return data;
})


const initialState:any= {
    postLists:[],
    fetchpost:false,
    errorMessage:null
}

const ServiceDefineList = createSlice({
    initialState: initialState,
    name: "servicelist",
    reducers: {
        // updateTable: (state) => {
        //     state.postLists = [];
        // },
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


export default ServiceDefineList.reducer