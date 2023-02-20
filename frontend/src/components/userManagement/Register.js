
import React,{useState} from 'react'
import { createNewUser } from '../../actions/securityActions'
import { useDispatch,useSelector } from 'react-redux'

const Register = (props) => {


    const dispatch=useDispatch()

    const error=useSelector(state=>state.error.errmessage)
    const validToken=useSelector(state=>state.security.validToken)

    if(validToken){
        props.history.push("/map")
    }

    const[user,setUser]=useState({
        username: "",
        fullName: "",
        password: "",
        confirmPassword: ""
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
            fullName: user.fullName,
            password: user.password,
            confirmPassword: user.confirmPassword
        }
        dispatch(createNewUser(newUser,props.history))
    }

  return (
    <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Account</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input onChange={onChange} value={user.fullName} type="text" className={`form-control form-control-lg ${!error.fullName ? "":"is-invalid"}`} placeholder="Full Name" name="fullName"/>
                            {error.fullName && (
                                    <div className="invalid-feedback">{error.fullName}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <input onChange={onChange} value={user.username} type="text" className={`form-control form-control-lg ${!error.username ? "":"is-invalid"}`} placeholder="Email Address (Username)" name="username" />
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
                        <div className="form-group">
                            <input onChange={onChange} value={user.confirmPassword} type="password" className={`form-control form-control-lg ${!error.confirmPassword ? "":"is-invalid"}`} placeholder="Confirm Password" name="confirmPassword" />
                            {error.confirmPassword && (
                                    <div className="invalid-feedback">{error.confirmPassword}</div>
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

export default Register