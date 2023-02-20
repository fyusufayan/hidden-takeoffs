import axios from 'axios'
import {SET_CURRENT_USER,GET_ERRORS} from './types'
import { errorActions } from "../reducers/errorSlice";
import {securityActions} from '../reducers/securitySlice'
import setJWTToken from '../securityUtils/setJWTToken.js'
import jwt_decode from 'jwt-decode'


export const createNewUser= (newUser,history)=>{
    return async dispatch=>{
        try {
            await axios.post("http://localhost:8080/api/users/register",newUser)
            history.push("/login")
            // dispatch({
            //     type:SET_CURRENT_USER,
            //     data:{}
            // })
        } catch (err) {
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:err.response.data
            }))
        }
    }
}

export const login=(loginRequest)=>{
    return async dispatch=>{
        try {
            const res=await axios.post("http://localhost:8080/api/users/login",loginRequest)
            //extract token
            const {token}=res.data
            //store the token in local storage
            localStorage.setItem("jwtToken",token)
            //set token in header
            setJWTToken(token)
            //decode token on react
            const decoded=jwt_decode(token)
            //dispatch to securityReducer
            dispatch(securityActions.setcurrentuserfunc({
                type:SET_CURRENT_USER,
                token:decoded
            }))
        } catch (err) {
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:err.response.data
            }))
        }
    }
}

export const logout= ()=>{
    return async dispatch=>{
        localStorage.removeItem("jwtToken")
        setJWTToken(false)
        dispatch(securityActions.setcurrentuserfunc({
            type:SET_CURRENT_USER,
            token:{}
        }))
    }
}