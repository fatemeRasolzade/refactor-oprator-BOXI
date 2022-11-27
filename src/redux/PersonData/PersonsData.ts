import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRoute } from "../../services/apiRoute";
import { PostDataParams } from "../../services/Service_call";
import { StateData } from "./state-model";

export const PersonnelData = createAsyncThunk("post", async () => {
  const params = `/filter?pageNumber=1&pageSize=20`;
  var data = {};
  try {
    data = await PostDataParams(apiRoute().post.filterPersonnel + params, {
      code: "",
      name: "",
      isActive: true,
    });
  } catch (error) {
    console.log("error ", error);
  }

  return data;
});

const initialState: StateData = {
  personnelList: [],
  fetchPost: false,
  errorMessage: null,
  isUpdating: false,
};

const PersonnelList = createSlice({
  initialState: initialState,
  name: "personnelList",
  reducers: {
    clearPersonnel: (state) => {
      state.personnelList = [];
    },
    updating: (state, action) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: {
    [PersonnelData.fulfilled as any]: (state, action) => {
      state.personnelList = action.payload.payload;
      state.fetchPost = false;
      state.errorMessage = null;
      state.isUpdating = false;
    },
    [PersonnelData.pending as any]: (state) => {
      state.fetchPost = true;
      state.personnelList = [];
      state.errorMessage = null;
      state.isUpdating = false;
    },
    [PersonnelData.rejected as any]: (state) => {
      state.fetchPost = false;
      state.errorMessage = "wrong";
      state.personnelList = [];
      state.isUpdating = false;
    },
  },
});
export const { clearPersonnel, updating } = PersonnelList.actions;
export default PersonnelList.reducer;
