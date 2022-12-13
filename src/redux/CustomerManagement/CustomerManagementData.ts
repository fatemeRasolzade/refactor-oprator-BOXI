import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataHeaderToServer } from "../../services/Service_call";
import { CREATE_CUSTOMER } from "../../services/apiRoute";

export const customerData = createAsyncThunk(
  "customerList",
  async (body: any) => {
    const params = `/filter?pageNumber=${
      body.pageNumber ? body.pageNumber : 1
    }&pageSize=${body.pageSize ? body.pageSize : 10}`;
    var data = {};
    try {
      data = await postDataHeaderToServer(
        CREATE_CUSTOMER + params,
        {
          ...body,
          pageNumber: undefined,
          pageSize: undefined,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
        }
      );
    } catch (error) {
      console.log("error ", error);
    }
    return data;
  }
);

const initialState: any = {
  productLists: [],
  fetchpost: false,
  errorMessage: null,
  isUpdating: false,
};

const CustomerDefineList = createSlice({
  initialState: initialState,
  name: "customerList",
  reducers: {
    updating: (state: any, action: any) => {
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

export const { updating } = CustomerDefineList.actions;
export default CustomerDefineList.reducer;
