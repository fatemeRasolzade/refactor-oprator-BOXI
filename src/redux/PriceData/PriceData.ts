import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataHeaderToServer } from "../../services/Service_call";
import { PRICE_API } from "../../services/apiRoute";

export const priceData = createAsyncThunk("priceList", async (body: any) => {
  const params = `/filter?pageNumber=${body.pageNumber ? body.pageNumber : 1}&pageSize=${body.pageSize ? body.pageSize : 10}`;
  var data = {};
  try {
    data = await postDataHeaderToServer(
      PRICE_API + params,
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
});

const initialState: any = {
  priceList: [],
  fetchpost: false,
  errorMessage: null,
  isUpdating: false,
};

const PriceList = createSlice({
  initialState: initialState,
  name: "priceList",
  reducers: {
    updating: (state: any, action: any) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: {
    [priceData.fulfilled as any]: (state, action) => {
      state.priceList = action.payload.payload;
      state.fetchPost = false;
    },
    [priceData.pending as any]: (state) => {
      state.fetchPost = true;
    },
    [priceData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
    },
  },
});

export const { updating } = PriceList.actions;
export default PriceList.reducer;
