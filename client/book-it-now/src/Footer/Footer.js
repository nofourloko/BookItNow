import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Footer() {
  return (
    <Container fluid>
      <Row>
          <Col xs= {12} style={{backgroundColor : '#053D38'}}>
              <p style={{color : 'white', textAlign: 'center', padding: '10px'}}>Book it now</p>
          </Col>
      </Row>
    </Container>
    
  )
}
