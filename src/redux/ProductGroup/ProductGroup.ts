import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { apiRoute } from '../../services/apiRoute';
import {postDataHeaderToServer } from '../../services/Service_call';


    export const ProductGroupsData=createAsyncThunk("ProductGroup",async(body:any)=>{
        const params=`/filter?pageNumber=${body.pageNumbers}&pageSize=10`
        const {payload}=await postDataHeaderToServer(apiRoute().post.Product_Group + params , {
                code:body.code ? body.code : "",
                name: body.name ?  body.name : "",
                description: body?.description ,
                isActive: body.isActive,
        }) 
        return payload
    })






const initialState = {
    ProductLists: [],
    fetchpost: false,
    errorMessage: "",
  };

  const ProductGroups=createSlice({
    name:"ProductGroup",
    initialState,

reducers:{

clearProductData:(state)=>{
    state.ProductLists=[]
}


},

    extraReducers: {
        [ProductGroupsData.fulfilled as any]: (state, action) => {
          state.ProductLists = action.payload;
          state.fetchpost = false;
        },
        [ProductGroupsData.pending as any]: (state) => {
          state.fetchpost = true;
        },
        [ProductGroupsData.rejected as any]: (state) => {
          state.fetchpost = false;
          state.errorMessage = "wrong";
        },
      },
  })

  export const {clearProductData} =ProductGroups.actions
  export default ProductGroups.reducer