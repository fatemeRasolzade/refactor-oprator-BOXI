import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const filterGate=createAsyncThunk('routeLists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.gate + params, {
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
    gateLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const GateLists= createSlice({
    initialState: initialState,
    name: "gateLists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterGate.fulfilled as any]: (state, action) => {
            state.gateLists = action.payload.payload;
            state.fetchPost = false;
        },
        [filterGate.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterGate.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default GateLists.reducer