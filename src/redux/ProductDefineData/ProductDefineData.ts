import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { postDataHeaderToServer } from '../../services/Service_call';
import { apiRoute } from '../../services/apiRoute';
import { ErrorAlert } from "../../global/alert/Alert";

export const productData=createAsyncThunk('productlists',async(body:any)=>{

    const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
    var data = {};
    try {
        data = await postDataHeaderToServer(apiRoute().post.product + params, {
          code:body.code,
          name:body.name,
          isActive:body.isActive
        },{
            headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
          });
      } catch (error) {
        console.log("error ", error);
      }


    return data;
})

const initialState:any= {
    productLists:[],
    fetchpost:false,
    errorMessage:null,
    isUpdating: false,    
}

const ProductDefineList = createSlice({
    initialState: initialState,
    name: "productlists",
    reducers: {
        updating: (state:any, action:any) => {
            state.isUpdating = action.payload;
          },
    },
    extraReducers: {
        [productData.fulfilled as any]: (state, action) => {
            state.productLists = action.payload.payload;
            state.fetchPost = false;
        },
        [productData.pending as any]: (state) => {
            state.fetchPost = true;
        },
        [productData.rejected as any]: (state) => {
            state.fetchPost = false;
            state.errorMessage = "wrong";
        },
    },
});

export const {  updating } = ProductDefineList.actions;
export default ProductDefineList.reducer