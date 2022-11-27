import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRoute } from "../../services/apiRoute";
import { PostDataParams } from "../../services/Service_call";
import { StateData } from "./state-model";

interface RoleDataBody {
  code: string;
  name: string;
  isActive: boolean;
}
export const RoleData = createAsyncThunk("post", async (body: RoleDataBody) => {
  const params = `/filter?pageNumber=1&pageSize=20`;
  var data = {};
  try {
    data = await PostDataParams(apiRoute().post.filterRole + params, body);
  } catch (error) {
    console.log("error ", error);
  }

  return data;
});

const initialState: StateData = {
  rolesList: [],
  fetchPost: false,
  errorMessage: null,
  isUpdating: false,
};

const RolesList = createSlice({
  initialState: initialState,
  name: "rolesList",
  reducers: {
    clearRole: (state) => {
      state.rolesList = [];
    },
    updating: (state, action) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: {
    [RoleData.fulfilled as any]: (state, action) => {
      state.rolesList = action.payload.payload;
      state.fetchPost = false;
      state.errorMessage = null;
      state.isUpdating = false;
    },
    [RoleData.pending as any]: (state) => {
      state.fetchPost = true;
      state.rolesList = [];
      state.errorMessage = null;
      state.isUpdating = false;
    },
    [RoleData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
      state.rolesList = [];
      state.isUpdating = false;
    },
  },
});
export const { clearRole, updating } = RolesList.actions;
export default RolesList.reducer;
