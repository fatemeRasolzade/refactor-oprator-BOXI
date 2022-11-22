import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRoute } from "../../services/apiRoute";
import { PostDataParams } from "../../services/Service_call";

export const RoleData = createAsyncThunk("post", async () => {
  const params = `/filter?pageNumber=1&pageSize=20`;
  var data = {};
  try {
    data = await PostDataParams(apiRoute().post.filterRole + params, {
      code: "",
      name: "",
      isActive: true,
    });
  } catch (error) {
    console.log("error ", error);
  }

  return data;
});

const initialState: any = {
  rolesList: [],
  fetchPost: false,
  errorMessage: null,
};

const RolesList = createSlice({
  initialState: initialState,
  name: "rolesList",
  reducers: {
    clearRole: (state) => {
      state.rolesList = [];
    },
  },
  extraReducers: {
    [RoleData.fulfilled as any]: (state, action) => {
      state.rolesList = action.payload.payload;
      state.fetchPost = false;
    },
    [RoleData.pending as any]: (state) => {
      state.fetchPost = true;
    },
    [RoleData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
    },
  },
});
export const { clearRole } = RolesList.actions;
export default RolesList.reducer;
