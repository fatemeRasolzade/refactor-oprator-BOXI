import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataHeaderToServer } from "../../services/Service_call";
import { CREATE_THIRDPARTY } from "../../services/apiRoute";

export const thirdPartyData = createAsyncThunk(
  "thirdPartyList",
  async (body: any) => {
    const params = `/filter?pageNumber=${
      body.pageNumber ? body.pageNumber : 1
    }&pageSize=${body.pageSize ? body.pageSize : 10}`;
    var data = {};
    try {
      data = await postDataHeaderToServer(
        CREATE_THIRDPARTY + params,
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
  thirdPartyLists: [],
  fetchpost: false,
  errorMessage: null,
  isUpdating: false,
};

const ThirdPartyDefineList = createSlice({
  initialState: initialState,
  name: "thirdPartyList",
  reducers: {
    updating: (state: any, action: any) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: {
    [thirdPartyData.fulfilled as any]: (state, action) => {
      state.thirdPartyList = action.payload.payload;
      state.fetchPost = false;
    },
    [thirdPartyData.pending as any]: (state) => {
      state.fetchPost = true;
    },
    [thirdPartyData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
    },
  },
});

export const { updating } = ThirdPartyDefineList.actions;
export default ThirdPartyDefineList.reducer;
