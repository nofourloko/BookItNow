import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./ServicesByCategory.css"
import ServicesInfo from '../SelectedService/ServicesInfo'
import { useNavigate } from 'react-router-dom'

export default function ServiceByCategoryCard({service, reserveService}) {
    const {mainImage, name, addressString,services,id} = service
    const navigate = useNavigate()
  
    const navigateToService = () => {
      navigate(`/service/${id}`)
    }

  return (
    <Row style={{margin: '1% 0%', paddingBottom:'5%', borderBottom: '1px solid #E8E8E8'}}>
      <Col xs={12} style={{marginBottom : '3%'}} />
      
        <Col md={4} onClick={() => navigateToService()}>
            <img src={mainImage} className='ServiceByCategoryCardImage ServiceByCategoryCardHoverEl'/>
        </Col>
        <Col md={8} >
          <div className='ServiceByCategoryCardInfoDiv' >
            <div className='ServiceByCategoryCardInfoDiv ServiceByCategoryCardHoverEl' 
                onClick={() => navigateToService()}>
               <span className='ServiceByCategoryCardInfoDivTitle'>{name}</span>
              <span className='ServiceByCategoryCardInfoDivAddress'>{addressString}</span>
            </div>
           
            {
              services.map(item => {
                return <ServicesInfo serviceInfo={item} reserveService={reserveService} id = {id} mainImage={mainImage} />
              })
            }
          </div>
            
        </Col>
    </Row>
  )
}
