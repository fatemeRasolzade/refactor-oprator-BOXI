import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterUrls } from "../../services/api.enums";

import { filterTableDataAPI } from "../../services/CRUDServices";
import { StateData } from "./state-model";

interface RoleDataBody {
  permission: string;
  name: string;
  isActive: boolean;
  pageSize: number;
  pageNumber: number;
}

const initialState: StateData = {
  rolesList: [],
  fetchPost: false,
  errorMessage: null,
  isUpdating: false,
  filter: {
    permission: "",
    name: "",
    isActive: true,
  },
};

export const fetchUpdateRuleData = createAsyncThunk(
  "fetchRuleData",
  async (data: RoleDataBody) => {
    const body = {
      permission: data.permission,
      name: data.name,
      isActive: data.isActive,
    };
    try {
      const res = await filterTableDataAPI(
        filterUrls.rule,
        data.pageNumber,
        body
      );
      return res.data;
    } catch (error) {
      return {};
    }
  }
);
const RolesList = createSlice({
  initialState: initialState,
  name: "rolesList",
  reducers: {
    clearRole: (state) => {
      state.rolesList = [];
    },
    updating: (state, action) => {
      state.isUpdating = action?.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUpdateRuleData.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(fetchUpdateRuleData.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Add any fetched posts to the array
        state.rolesList = action?.payload?.payload;
      })
      .addCase(fetchUpdateRuleData.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});
export const { clearRole, updating, setFilter } = RolesList.actions;
export default RolesList.reducer;
