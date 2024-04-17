import React from 'react'
import { Col } from 'react-bootstrap'

export default function SafeRulesCard({img, text}) {
  return (
    <Col xs={12} md={6}>
        <div style={{display : 'flex', flexDirection: 'row', gap: '10px'}}>
            <img src={img} style={{width : '24px', height: '24px'}}/>
            <p>{text}</p>
        </div>
        
    </Col>
  )
}
