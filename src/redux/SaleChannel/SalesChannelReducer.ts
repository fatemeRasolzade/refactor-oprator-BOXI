import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { postDataHeaderToServer } from '../../services/Service_call';
import { apiRoute } from '../../services/apiRoute';


export const filterSalesChannel=createAsyncThunk('salechannel',async(body:any)=>{
    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.salesChannel + params, {
        ...body
        });
      } catch (error) {
        console.log("error ", error);
      }
    return data;
    })



const initialState:any= {
    sChannelLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,
    
}

const SalesChannelList = createSlice({
    initialState: initialState,
    name: "salechannel",
    reducers: {
        updating: (state, action) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [filterSalesChannel.fulfilled as any]: (state, action) => {
            state.sChannelLists = action.payload.payload;
            state.fetchPost = false;
        },
        [filterSalesChannel.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [filterSalesChannel.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

export default SalesChannelList.reducer