import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { postDataHeaderToServer } from "../../services/Service_call"
import { apiRoute } from './../../services/apiRoute';



export const HubTypeData=createAsyncThunk("hubType",async(page:number)=>{
     const params=`/filter?pageNumber=${page}&pageSize=10`
    const {payload}=await postDataHeaderToServer(apiRoute().post.Type_Hub_table + params,{},{
        headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
      })
     console.log(payload)
    return payload
})

interface HubType{
    TableType:any,
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
          deleteTable:(state,action)=>{
            state.TableType.content=state.TableType.content.filter((item:any)=>item.code !== action.payload)
          },
          addToTableType:(state,action)=>{
            state.TableType.content=[...state.TableType.content,action.payload]
          }
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

 export const {clearHubType,deleteTable,addToTableType}=HubTypeTable.actions
 export default HubTypeTable.reducer