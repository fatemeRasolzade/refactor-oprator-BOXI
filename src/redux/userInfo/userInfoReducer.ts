import { createSlice } from "@reduxjs/toolkit";
import { StateData } from "./state-model";

const initialState: StateData = {
    isSuperAdmin:undefined
}
const UserInfoReducer = createSlice({
    initialState: initialState,
    name: "userInfo",
    reducers: {
        getUserInfo:(state ,action)=>{
            
            return state=action.payload
        }
    }
})
export const { getUserInfo} = UserInfoReducer.actions;
export default UserInfoReducer.reducer;
