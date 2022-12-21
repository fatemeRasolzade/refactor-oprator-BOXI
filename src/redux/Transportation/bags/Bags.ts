import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";



export const filterBags=createAsyncThunk('filterData',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.bags + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
})

const initialState:any= {
    bagsData:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const BagsLists= createSlice({
    initialState: initialState,
    name: "filterData",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterBags.fulfilled as any]: (state, action) => {
            state.bagsData = action.payload.payload;
            state.fetchPost = false;
        },
        [filterBags.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterBags.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default BagsLists.reducer