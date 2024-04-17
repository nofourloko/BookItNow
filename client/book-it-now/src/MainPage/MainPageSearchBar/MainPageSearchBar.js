import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./MainPageSearchBarStyle.css"
import axios from 'axios';
import SearchBar from '../../SearchBar/SearchBar';

export default function MainPageSearchBar() {
  const [servicesList, setServicesList] = useState()
  return (
    <Container className='mainPageSearchBarContainer' fluid>
        <Row >
                <Col style={{margin: '2% auto', textAlign: 'center'}} xs={6}>
                    <p className='textAttention'>Zarezerwuj swój czas</p>
                    <p style={{fontSize: '32px'}}> Odkryj salony w okolicy</p>
                </Col>
                <Row>
                    <Col style={{margin: '0 auto'}} xs={6}>
                        <SearchBar />
                    </Col>
                </Row>
            </Row>
    </Container>
            
            
  )
}
