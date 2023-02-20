import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Landing = (props) => {

    const validToken=useSelector(state=>state.security.validToken)

    if(validToken){
        props.history.push("/map")
    }

  return (
    <div className="landing">
        <div className="light-overlay landing-inner text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Hidden Takeoffs</h1>
                        <p className="lead">
                            Create your account to expose and review hidden takeoffs
                        </p>
                        <hr />
                        <Link to="/register" className="btn btn-lg btn-primary mr-2">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing