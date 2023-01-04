import { createSlice } from "@reduxjs/toolkit";

import { StateData } from "./state-model";

const initialState: StateData = {
  filter: {
    isActive: true,
  },
};

const ConsignmentReducer = createSlice({
  initialState: initialState,
  name: "consignment",
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const { setFilter } = ConsignmentReducer.actions;
export default ConsignmentReducer.reducer;
