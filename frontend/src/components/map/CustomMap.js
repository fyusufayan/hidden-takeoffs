import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { NewLocation } from './NewLocation'
import { useDispatch,useSelector } from 'react-redux'
import L from 'leaflet';
// import { Modal } from 'bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { takeoffActions } from '../../reducers/takeoffSlice' 
import { SET_NEW_TAKEOFF } from '../../actions/types' 
import { getAllTakeoffs } from '../../actions/takeoffActions'
import Location from './Location'


const iconGlider= new L.Icon({
  iconUrl:require('../../resources/paragliding_icon.png'),
  iconRetinaUrl:require('../../resources/paragliding_icon.png'),
  iconSize:new L.Point(30,35)
})


const CustomMap = () => {

  const dispatch=useDispatch()

  const[map,setMap]=useState(null)
  const[newLocation,setNewLocation]=useState(null)
  const[showModal,setShowModal]=useState(false)
  const[allTakeoff,setAllTakeoff]=useState(false)

  const handleClose = () => {
    setShowModal(false);            
    dispatch(takeoffActions.setnewtakeofffunc({
      type:SET_NEW_TAKEOFF,
      newTakeoff:{}
    }))
    setNewLocation(null)
  };

  const handleShow = () => setShowModal(true);

  const createdTakeoff=useSelector(state=>state.takeoff.newTakeoff)
  const allTakeoffs=useSelector(state=>state.takeoff.allTakeoffs)


  useEffect(()=>{
    if (Object.keys(createdTakeoff).length!==0) {
      handleShow()
    }
    if (!allTakeoff) {
      console.log("hello")
      dispatch(getAllTakeoffs())
      setAllTakeoff(true)
    }
  },[allTakeoff,createdTakeoff,dispatch])

  useEffect(()=>{
    if (map) {
      map.on("click", function (e) {
        if (newLocation!=null) {
          setNewLocation(null)
          return
        }
        setNewLocation({
          lat:e.latlng.lat,
          lng:e.latlng.lng
        })
      });
    }
  })

  return (

    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have successfully exposed a new hidden takeoff !</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Get Back to Map
          </Button>
        </Modal.Footer>
      </Modal>

      <MapContainer ref={setMap} style={{ height: '100vh',width:'100%'}} center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {newLocation && 
          <Marker icon={iconGlider} position={[newLocation.lat, newLocation.lng]}>
            <Popup minWidth="380" >
              <NewLocation newLocation={newLocation}/>
            </Popup>
          </Marker>
        }

        {allTakeoffs.map(takeoff=>(
          <Marker key={takeoff.id} icon={iconGlider} position={[takeoff.lat, takeoff.lng]}>
            <Popup minWidth="380" >
              <Location location={takeoff}/>
            </Popup>
          </Marker>
        ))}

      </MapContainer> 
    </>

  )
}

export default CustomMap