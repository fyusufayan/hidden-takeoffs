import React,{useEffect, useState} from 'react'
import { login } from '../../actions/securityActions'
import { useDispatch,useSelector } from 'react-redux'

const Login = (props) => {

    const dispatch=useDispatch()

    const error=useSelector(state=>state.error.errmessage)
    const validToken=useSelector(state=>state.security.validToken)

    if(validToken){
        props.history.push("/map")
    }


    useEffect(()=>{
        if(validToken){
            props.history.push('/map')
        }
    },[validToken,props.history])


    const[user,setUser]=useState({
        username: "",
        password: ""
    })

    const onChange=(e)=>{
        setUser(prevState=>{
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const newUser={
            username: user.username,
            password: user.password
        }
        dispatch(login(newUser,props.history))
    }


  return (
    <div className="login">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input onChange={onChange} value={user.username} type="text" className={`form-control form-control-lg ${!error.username ? "":"is-invalid"}`} placeholder="Email Address" name="username" />
                            {error.username && (
                                    <div className="invalid-feedback">{error.username}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <input onChange={onChange} value={user.password} type="password" className={`form-control form-control-lg ${!error.password ? "":"is-invalid"}`} placeholder="Password" name="password" />
                            {error.password && (
                                    <div className="invalid-feedback">{error.password}</div>
                            )}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login