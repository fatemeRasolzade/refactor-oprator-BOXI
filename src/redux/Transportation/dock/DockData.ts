import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const filterDock=createAsyncThunk('docklists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.dock + params, {
        ...body
        });
      } catch (error) {
            console.log("error ", error);
      }
    return data;
})

const initialState:any= {
    dockLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const DockLists= createSlice({
    initialState: initialState,
    name: "gateLists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterDock.fulfilled as any]: (state, action) => {
            state.dockLists = action.payload.payload;
            state.fetchPost = false;
        },
        [filterDock.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterDock.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default DockLists.reducer