import {createSlice} from "@reduxjs/toolkit"

interface pageNumber{
    pageNumbers:number
}


const initialState :pageNumber= {
    pageNumbers:1
}

const pageNumber=createSlice({
    initialState,
    name:"pageNumber",
    reducers:{
        Actionpage:(state,action)=>{
            state.pageNumbers =action.payload
        }
    }

})

export const {Actionpage}=pageNumber.actions
export default pageNumber.reducer