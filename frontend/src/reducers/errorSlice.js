import { GET_ERRORS } from "../actions/types";
import { createSlice } from "@reduxjs/toolkit";


const errorSlice=createSlice({
    name:'error',
    initialState:{errmessage:{}},
    reducers:{
        errorfunc(state,action){
            if(action.payload.type===GET_ERRORS){
                state.errmessage=action.payload.errorMessage
            }

        }
    }
})


export const errorActions=errorSlice.actions
export default errorSlice;