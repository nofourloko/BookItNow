import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ServiceInfoCard from './ServiceInfoCard'

export default function MainPageServiceList() {
  const [servicesList, setServicesList] = useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const repsone = await axios.get('http://127.0.0.1:5000/services/newestServicesList')
            setServicesList(repsone.data)
          } catch (error) {
            console.log(error)
            // window.location.href = '/error'
          }
          
        }
    
        fetchData()
      },[])
  return (
    <Container style={{padding : '50px 0px'}}>
      <Row>
          <Col  xs ={12} lg={5} style={{padding : '0px'}}>
              <p style={{fontSize: '32px'}}>Najnowsze</p>
          </Col>
          
      </Row>
      <Row style={{margin : '1% 3%'}}>
        {
          servicesList ? servicesList.map(item => {
            return <ServiceInfoCard service={item} />
          }): <></>
        }
      </Row>
    </Container>
    
  )
}
