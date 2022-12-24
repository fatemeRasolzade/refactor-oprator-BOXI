import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from "../../../services/apiRoute";
import { postDataHeaderToServer } from "../../../services/Service_call";


export const filterRoute=createAsyncThunk('routeLists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.route + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
})

const initialState:any= {
    routeLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const RouteLists= createSlice({
    initialState: initialState,
    name: "routeLists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterRoute.fulfilled as any]: (state, action) => {
            state.routeLists = action.payload.payload;
            state.fetchPost = false;
        },
        [filterRoute.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterRoute.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

// export const {  updating } = ProductDefineList.actions;
export default RouteLists.reducer