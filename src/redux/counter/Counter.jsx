import {createSlice} from "@reduxjs/toolkit"



const counter=createSlice({
    initialState:{
        value:0
    },
    name:'counter',
    reducers:{
        count:(state,action)=>{
            state.value +=1

        }
    },

})
export const {count} =counter.reducer

export default counter
