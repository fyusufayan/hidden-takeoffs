import { SET_CURRENT_USER } from "../actions/types";
import { createSlice } from "@reduxjs/toolkit";

const booleanActionPayload=payload=>{
    if (payload) {
        return true
    } else {
        return false
    }
}

const securitySlice=createSlice({
    name:'security',
    initialState:{
        user:{},
        validToken:false
    },
    reducers:{
        setcurrentuserfunc(state,action){
            if(action.payload.type===SET_CURRENT_USER){
                state.user=action.payload.token
                state.validToken=booleanActionPayload(action.payload.token)
            }
        }
    }
})


export const securityActions=securitySlice.actions
export default securitySlice;