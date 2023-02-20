import { SET_NEW_TAKEOFF,SET_ALL_TAKEOFFS } from "../actions/types";
import { createSlice } from "@reduxjs/toolkit";

const takeoffSlice=createSlice({
    name:'takeoff',
    initialState:{
        newTakeoff:{},
        allTakeoffs:[]
    },
    reducers:{
        setnewtakeofffunc(state,action){
            if(action.payload.type===SET_NEW_TAKEOFF){
                state.newTakeoff=action.payload.newTakeoff
            }
        },
        setalltakeoffsfunc(state,action){
            if(action.payload.type===SET_ALL_TAKEOFFS){
                state.allTakeoffs=action.payload.Takeoffs
            }
        }
    }
})


export const takeoffActions=takeoffSlice.actions
export default takeoffSlice;