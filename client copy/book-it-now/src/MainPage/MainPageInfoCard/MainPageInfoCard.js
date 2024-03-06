import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './MainPageInfoCardStyle.css'

export default function MainPageInfoCard({InfoCardDetails, Index}) {
  return (
    <Row>
        {
            Index++ % 2  === 0 ? 
            <>
                <Col xs ={12} lg={5} style={{padding : '50px'}}>
                    <div className='infoMainPageDiv'>
                        <h3>{InfoCardDetails.header}</h3>
                        <p>{InfoCardDetails.p1}</p>
                        <p>{InfoCardDetails.p2}</p>
                        <b>{InfoCardDetails.footer}</b>
                    </div>
                
                </Col>
                <Col xs={12} lg={6}>
                    <div className='infoMainPageDivImage'>
                        <img src={InfoCardDetails.image} style={{height:'500px', marginLeft: '20%'}}/>
                    </div>
                    
                </Col>
            </>:
            <>
            <Col xs={12} lg={6}>
                <div className='infoMainPageDivImage'>
                    <img src={InfoCardDetails.image} style={{height:'500px', marginLeft: '20%'}}/>
                </div>
                
            </Col>
            <Col xs ={12} lg={5} style={{padding : '50px'}}>
                <div className='infoMainPageDiv'>
                    <h3>{InfoCardDetails.header}</h3>
                    <p>{InfoCardDetails.p1}</p>
                    <p>{InfoCardDetails.p2}</p>
                    <b>{InfoCardDetails.footer}</b>
                </div>
            
            </Col>
        </>
                
            
            
        }
            
        
    </Row>
  )
}
