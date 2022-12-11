import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateData } from "./state-model";

const initialState: StateData = {
  selectedRows: [],
};

const SelectedRowsList = createSlice({
  initialState: initialState,
  name: "selectedRows",
  reducers: {
    clearRows: (state) => {
      state.selectedRows = [];
    },
    addRows: (state, action) => {
      state.selectedRows = [...state.selectedRows, action.payload];
    },
    deleteRow: (state, action) => {
      state.selectedRows = state.selectedRows.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});
export const { clearRows, addRows, deleteRow } = SelectedRowsList.actions;
export default SelectedRowsList.reducer;
