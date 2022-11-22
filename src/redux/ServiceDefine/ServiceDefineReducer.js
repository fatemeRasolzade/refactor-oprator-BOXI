import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { PostDataParams } from './../../services/Service_call';
import { apiRoute } from './../../services/apiRoute';




export const ServiceData=createAsyncThunk('servicelist',async()=>{
    const params=`/filter?pageNumber=1&pageSize=20`
    const data=await PostDataParams(apiRoute().post.serviceDefine, params, {})
    return data
})


const initialState={
    postLists:[],
    fetchpost:false,
    errorMessage:null
}

const ServiceDefineList=createSlice({
    initialState:initialState,
    name:'servicelist',
    extraReducers:{
        [ServiceData.fulfilled]:(state,action)=>{
            state.postLists=action.payload
            state.fetchpost=false
        },
        [ServiceData.pending]:(state)=>{
            state.fetchpost=true
        },
        [ServiceData.rejected]:(state)=>{
            state.fetchpost=false
            state.errorMessage='wrong'
        }

    }
})
export default ServiceDefineList.reducer