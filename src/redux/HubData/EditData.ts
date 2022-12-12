import {createSlice} from "@reduxjs/toolkit"


interface EditItem{
    editData:object
}
const initialState:EditItem={
    editData:{}
  }

const EditHub=createSlice({
    name:"EditHub",
    initialState,
    reducers:{
      editHub:(state,action)=>{
        state.editData=action.payload
      },
      clearEdit:(state)=>{
        state.editData={}
      }
    }
  
  })

  export const {editHub,clearEdit} =EditHub.actions
  export default EditHub.reducer