import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Location = ({location}) => {
  return (
    <Card border='light'>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>{location.description}</Card.Text>
        {location.windDirection.map((element)=>(
            <Button variant="primary">{element.direction}</Button>
        ))}
      </Card.Body>
    </Card>
  )
}

export default Location