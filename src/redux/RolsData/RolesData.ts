import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRoute } from "../../services/apiRoute";
import { filterTableDataAPI } from "../../services/CRUDServices";
import { PostDataParams } from "../../services/Service_call";
import { StateData } from "./state-model";

interface RoleDataBody {
  permission: string;
  name: string;
  isActive: boolean;
  pageSize: number;
  pageNumber: number;
}

export const RoleData = createAsyncThunk("post", async (body: RoleDataBody) => {
  const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
  // http://boxi.local:40000/resource-api/role/filter?pageNumber=1&pageSize=10
  const bodyData = {
    selectPermissions: body.permission ? body.permission : [],
    name: body.name,
    isActive: body.isActive,
  };
  var data = {};
  try {
    return await filterTableDataAPI("resource-api/role/filter", 10, bodyData);

    // data = await PostDataParams(apiRoute().post.filterRole + params, {
    //   selectPermissions: body.permission ? body.permission : [],
    //   name: body.name,
    //   isActive: body.isActive,
    // });
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
    fetchRuleData: (state, action) => {
      state.rolesList = action.payload;
    },
    clearRole: (state) => {
      state.rolesList = [];
    },
    updating: (state, action) => {
      state.isUpdating = action?.payload;
    },
  },
  extraReducers: {
    [RoleData.fulfilled as any]: (state, action) => {
      state.rolesList = action?.payload?.payload;
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
export const { clearRole, updating, fetchRuleData } = RolesList.actions;
export default RolesList.reducer;
