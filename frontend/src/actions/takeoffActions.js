import axios from 'axios'
import { errorActions } from "../reducers/errorSlice";
import { takeoffActions } from '../reducers/takeoffSlice';
import {GET_ERRORS,SET_NEW_TAKEOFF,SET_ALL_TAKEOFFS} from './types'


export const createNewTakeoff= (newTakeoff,history)=>{
    return async dispatch=>{
        try {
            const res=await axios.post("http://localhost:8080/api/takeoff",newTakeoff)
            // const {takeoff}=res.data
            console.log(res.data)
            console.log(res.status)
            // history.push("/map")

            dispatch(takeoffActions.setnewtakeofffunc({
                type:SET_NEW_TAKEOFF,
                newTakeoff:res.data
            }))

        } catch (err) {
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:err.response.data
            }))
        }
    }
}

export const getAllTakeoffs=()=>{
    return async dispatch=>{
        try {
            const res=await axios.get("http://localhost:8080/api/takeoff/all")
            // const {takeoff}=res.data
            console.log(res.data)
            // history.push("/map")

            dispatch(takeoffActions.setalltakeoffsfunc({
                type:SET_ALL_TAKEOFFS,
                Takeoffs:res.data
            }))

        } catch (err) {
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:err.response.data
            }))
        }
    }
}