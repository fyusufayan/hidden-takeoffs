import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createNewTakeoff } from '../../actions/takeoffActions'
import { DIRECTIONS } from '../../actions/types'


export const NewLocation = (props) => {

  const dispatch=useDispatch()

  const[LocationDetails,SetLocationDetails]=useState({
    lat:props.newLocation.lat,
    lng:props.newLocation.lng
  })
  const[windDirection,SetWindDirection] =useState({
    "N":false,
    "NE":false,
    "E":false,
    "SE":false,
    "S":false,
    "SW":false,
    "W":false,
    "NW":false
  })

  const error=useSelector(state=>state.error.errmessage)

  const onChange=(e)=>{
    if(e.target.name !== "name" && e.target.name !== "description"){
      SetWindDirection(prevState=>{
        return {...prevState,[e.target.name]:e.target.checked}
      })
    }

    SetLocationDetails(prevState=>{
        return {...prevState,[e.target.name]:e.target.value}
    })
  }

  const onSubmit=(e)=>{
    e.preventDefault()

    const location={
        name: LocationDetails.name,
        description: LocationDetails.description,
        lat: Math.round((LocationDetails.lat+Number.EPSILON)*1000000)/1000000,
        lng: Math.round((LocationDetails.lng+Number.EPSILON)*1000000)/1000000,
        windDirection:[]
    }
    for (const element in windDirection) {
      if (windDirection[element]===true) {
        location.windDirection.push({direction:element})
      }
    }
    dispatch(createNewTakeoff(location,props.history))
  }

  return (

    <form onSubmit={onSubmit}>
      <h4>Expose New Hidden Takeoff !</h4>
      <div className="form-group row">
          <label htmlFor="name" className='col-sm-4 col-form-label'>Name</label>
          <div className='col-sm-8'>
            <input onChange={onChange} value={LocationDetails.name} type="text" className={`form-control form-control-sm ${!error.name ? "":"is-invalid"}`} placeholder="Name of Takeoff" name="name" id='name'/>
            {error.name && (
                    <div className="invalid-feedback">{error.name}</div>
            )}
          </div>
      </div>
      <div className="form-group row">
        <label htmlFor="description" className='col-sm-4 col-form-label'>Description</label>
        <div className='col-sm-8'>
          <input onChange={onChange} value={LocationDetails.description} type="text" className={`form-control form-control-sm ${!error.description ? "":"is-invalid"}`} placeholder="Description" name="description" id='description'/>
          {error.description && (
                  <div className="invalid-feedback">{error.description}</div>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className='col-sm-4 col-form-label'>Wind Direction</label>
        <div className='col-sm-8'>
            {DIRECTIONS.map(direction=>(
                  <div key={direction} className='form-check form-check-inline col-sm-2'>
                        <input onChange={onChange} id={direction} type="checkbox" className='btn-check' name={direction}/>
                        <label className='btn btn-sm-1 btn-outline-success' htmlFor={direction}>{direction}</label>
                  </div>
              ))}
          {error.description && (
            <div className="invalid-feedback">{error.description}</div>
          )}
        </div>
      </div>

      <input type="submit" className="btn btn-info btn-block mt-4" />
    </form>

  )
}
