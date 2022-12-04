import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


const initialState:any= {
    productLists:[],
    fetchpost:false,
    errorMessage:null,
    close: false,
    
}

const ActionModal = createSlice({
    initialState: initialState,
    name: "modal",
    reducers: {
        clodeModal: (state:any, action:any) => {
            state.close = action.payload;
          },
    },

});

export const {  clodeModal } = ActionModal.actions;
export default ActionModal.reducer