import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataHeaderToServer } from "../../services/Service_call";
import { PICKUP } from "../../services/apiRoute";

export const pickupData = createAsyncThunk("pickupList", async (body: any) => {
  const params = `/filter?pageNumber=${body.pageNumber ? body.pageNumber : 1}&pageSize=${body.pageSize ? body.pageSize : 10}`;
  var data = {};
  try {
    data = await postDataHeaderToServer(PICKUP + params, {
      ...body,
      pageNumber: undefined,
      pageSize: undefined,
    });
  } catch (error) {
    console.log("error ", error);
  }
  return data;
});

const initialState: any = {
  pickupList: [],
  fetchpost: false,
  errorMessage: null,
  isUpdating: false,
  filter: {},
};

const PickupList = createSlice({
  initialState: initialState,
  name: "pickupList",
  reducers: {
    updating: (state: any, action: any) => {
      state.isUpdating = action.payload;
    },
    clearPickup: (state) => {
      state.pickupList = [];
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [pickupData.fulfilled as any]: (state, action) => {
      state.pickupList = action.payload.payload;
      state.fetchPost = false;
    },
    [pickupData.pending as any]: (state) => {
      state.fetchPost = true;
    },
    [pickupData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
    },
  },
});

export const { updating, clearPickup, setFilter } = PickupList.actions;
export default PickupList.reducer;
