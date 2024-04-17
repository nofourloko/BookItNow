import axios from 'axios'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Map from '../Utils/Map'
import SelectedServiceContact from './SelectedServiceContact'
import ServicesInfo from './ServicesInfo'
import SafeRules from './SafeRules'
import CommentsSection from './CommentsSection'
import Header from '../Header/Header'
import Reservation from './Resevation/Reservation'


export default function SelectedService() {
    const {id} = useParams()
    const [filter, setFilter] = useState("")
    const [service, setService] = useState("")
    const [selectedServiceServiceDetails, setSelectedServiceServiceDetails] = useState(null)

useEffect(() => {
    const fetchData = async () => {
      try {
        const repsone = await axios.get(`http://127.0.0.1:5000/services/selectedService/${id}`)
        setService(repsone.data)
      } catch (error) {
        console.log(error)
        window.location.href = '/error'
      }
      
    }

    fetchData()
  },[])



  const reserveService = (ServiceDetails) => {
    setFilter('filter')
    document.body.classList.add('no-scroll');
    setSelectedServiceServiceDetails(ServiceDetails)
  }

  const reserveServiceClose = () => {
    if(filter !== ""){
      setFilter('')
      document.body.classList.remove('no-scroll');
    }
    
  }

  return (
    service && 
    <>
      <div id={filter} onClick={() => { reserveServiceClose() }}>
        <Header />
        <Row style={{margin : "0px auto"}}  >
        <Col md={12} xs={6} style={{margin : '0 auto' }}>
          <Row>
            <Col lg = {7} style={{margin : '1% auto'}}>
              <div>
                <img src={service.serviceData.mainImage} style={{width :'100%', borderRadius: '10px'}}/>
                <p style={{fontSize: '30px', fontWeight: 'bolder', marginTop: '10px'}}>{service.serviceData.id}</p>
                <p>{service.serviceData.addressString}</p>
                <p>Przedsiębiorca</p>
                <p style={{fontSize: '30px' }}>Usługi</p>
                {
                  service.serviceData.services.map(item => {
                    return <ServicesInfo serviceInfo={item} reserveService={reserveService}/>
                  })
                }
              </div>
              <SafeRules />
              <CommentsSection comments = {service.serviceData.reviews} reviewStatistics = {service.reviewsStats} serviceId = {id}/>
            </Col>

            <Col lg = {4} style={{margin : '1% 0%', padding: '0 auto'}}>
              <div style={{position : 'sticky', top: "10px", padding:'0px 60px 0px 0px' }}>
                <Map cnt = {service.address}/>
                <SelectedServiceContact service={service.serviceData}/>
              </div>
              
            </Col>
          </Row>
        
        </Col>
        
      </Row>
    
      </div>
      {
        filter !== "" &&
        <Reservation 
          reserveServiceClose={reserveServiceClose} 
          serviceId = {service.serviceData.id} 
          selectedServiceServiceDetails={selectedServiceServiceDetails}
          mainImage = {service.serviceData.mainImage}/>
      }
    </>
  )
  
}
