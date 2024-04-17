import React from 'react'
import { Card } from 'react-bootstrap'
import './ServiceInfoCard.css'

export default function ServiceInfoCard({service}) {
  return (
    <Card style={{ width: '18rem' ,padding : '0'}}>
      <Card.Img variant="top" src={service.mainImage} />
      <Card.Body>
        <Card.Title onClick={() => window.location.href = `/service/${service.id}`} className='titleLink'>{service.name}</Card.Title>
        <Card.Text>
          {service.addressString}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
