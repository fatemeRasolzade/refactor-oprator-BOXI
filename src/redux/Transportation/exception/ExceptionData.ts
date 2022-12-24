import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const filterException=createAsyncThunk('exception',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.exception + params, {
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
    exceptionLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const ExceptionLists= createSlice({
    initialState: initialState,
    name: "exception",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterException.fulfilled as any]: (state, action) => {
            state.exceptionLists = action.payload.payload;
            state.fetchPost = false;
        },
        [filterException.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterException.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default ExceptionLists.reducer