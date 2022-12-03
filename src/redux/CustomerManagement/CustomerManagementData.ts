import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { PostDataParams } from '../../services/Service_call';
import { apiRoute } from '../../services/apiRoute';


export const customerData=createAsyncThunk('customerList',async(body:any)=>{
    const params = `/filter?pageNumber=1&pageSize=20`;
    var data = {};
    try {
   
        data = await PostDataParams(apiRoute().post.customer + params, body);

    } catch (error) {
        console.log("error ", error);
    }
    return data;
})


const initialState:any= {
    customerList:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,
    
}

const ProductDefineList = createSlice({
    initialState: initialState,
    name: "customerList",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [customerData.fulfilled as any]: (state, action) => {
            state.customerList = action.payload.payload;
            state.fetchPost = false;
        },
        [customerData.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [customerData.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

export const {  updating } = ProductDefineList.actions;
export default ProductDefineList.reducer