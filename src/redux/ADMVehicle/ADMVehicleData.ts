import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataHeaderToServer } from "../../services/Service_call";
import { CREATE_ADMVEHICLE } from "../../services/apiRoute";

export const ADMVehicleData = createAsyncThunk("ADMVehicleList", async (body: any) => {
  const params = `/filter?pageNumber=${body.pageNumber ? body.pageNumber : 1}&pageSize=${body.pageSize ? body.pageSize : 10}`;
  var data = {};
  try {
    data = await postDataHeaderToServer(
      CREATE_ADMVEHICLE + params,
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
  ADMVehicleList: [],
  fetchpost: false,
  errorMessage: null,
  isUpdating: false,
};

const ADMVehicleList = createSlice({
  initialState: initialState,
  name: "ADMVehicleList",
  reducers: {
    updating: (state: any, action: any) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: {
    [ADMVehicleData.fulfilled as any]: (state, action) => {
      state.ADMVehicleList = action.payload.payload;
      state.fetchPost = false;
    },
    [ADMVehicleData.pending as any]: (state) => {
      state.fetchPost = true;
    },
    [ADMVehicleData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
    },
  },
});

export const { updating } = ADMVehicleList.actions;
export default ADMVehicleList.reducer;
