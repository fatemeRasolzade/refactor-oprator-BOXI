import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { postDataHeaderToServer } from "../../services/Service_call"
import { apiRoute } from './../../services/apiRoute';



export const HubTypeData=createAsyncThunk("hubType",async()=>{
     const params=`/filter?pageNumber=1&pageSize=20`
    const {payload}=await postDataHeaderToServer(apiRoute().post.Type_Hub_table + params,{},{
        headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
      })
      console.log("jjjjjjjjjjjjjj",payload)
    return payload
})

interface HubType{
    TableType:Array<object>,
    fetchpost:boolean,
    errorMessage:string 
}



const initialState:HubType={
    TableType:[],
    fetchpost: false,
    errorMessage: "",
}


 const HubTypeTable=createSlice({
    name:"hubType",
    initialState,
    reducers:{
        clearHubType: (state) => {
            state.TableType = [];
          },
    },
    extraReducers: {
        [HubTypeData.fulfilled as any]: (state, action) => {
          state.TableType = action.payload;
          state.fetchpost = false;
        },
        [HubTypeData.pending as any]: (state) => {
          state.fetchpost = true;
        },
        [HubTypeData.rejected as any]: (state) => {
          state.fetchpost = false;
          state.errorMessage = "wrong";
        },
      },
 }) 

 export const {clearHubType}=HubTypeTable.actions
 export default HubTypeTable.reducer