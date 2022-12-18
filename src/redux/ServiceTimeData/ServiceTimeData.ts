import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataHeaderToServer } from "../../services/Service_call";
import { CREATE_SERVICETIME } from "../../services/apiRoute";

export const serviceTimeData = createAsyncThunk("serviceTimeList", async (body: any) => {
  const params = `/filter?pageNumber=${body.pageNumber ? body.pageNumber : 1}&pageSize=${body.pageSize ? body.pageSize : 10}`;
  var data = {};
  try {
    data = await postDataHeaderToServer(
      CREATE_SERVICETIME + params,
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
  serviceTimeList: [],
  fetchpost: false,
  errorMessage: null,
  isUpdating: false,
};

const ServiceTimeList = createSlice({
  initialState: initialState,
  name: "serviceTimeList",
  reducers: {
    updating: (state: any, action: any) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: {
    [serviceTimeData.fulfilled as any]: (state, action) => {
      state.serviceTimeList = action.payload.payload;
      state.fetchPost = false;
    },
    [serviceTimeData.pending as any]: (state) => {
      state.fetchPost = true;
    },
    [serviceTimeData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
    },
  },
});

export const { updating } = ServiceTimeList.actions;
export default ServiceTimeList.reducer;
