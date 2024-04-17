import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import "./ServicesByCategory.css"
import Loading from '../Utils/loading'
import ServiceByCategoryCard from './ServiceByCategoryCard'
import Reservation from '../SelectedService/Resevation/Reservation'
import NoResult from '../Utils/NoResult'


export default function ServicesByCategory() {
    const navigate = useNavigate()
    const {category} = useParams()
    const [filter, setFilter] = useState("")
    const [selectedServiceServiceDetails, setSelectedServiceServiceDetails] = useState(null)
    const [serviceId,setServiceId] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [servicesByCategory, setServicesByCategory] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/services/service_by_category/${category}`)
                setServicesByCategory(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
                navigate("/error")
              
            }
        }

        fetchData()
    },[])

    const reserveService = (ServiceDetails,id, mainImage) => {
        setFilter('filter')
        document.body.classList.add('no-scroll');
        setSelectedServiceServiceDetails(ServiceDetails)
        setServiceId(id)
        setMainImage(mainImage)
      }

      const reserveServiceClose = () => {
        if(filter !== ""){
          setFilter('')
          document.body.classList.remove('no-scroll');
        }
        
      }
  return (
    
    <div>
        {
            servicesByCategory ?
            <>
            <Header />
            <div id={filter} onClick={() => { reserveServiceClose()}}>
            
            <Container  >
            
                <Row>
                    <Col xs={12} style={{borderBottom: '1px solid #E8E8E8',marginTop : '5%'}}>
                        <span className='spanHeaderCategory'>{category} ({servicesByCategory.length})</span>
                    </Col>
                </Row>
                {
                    servicesByCategory.length > 0 ?
                    servicesByCategory.map(service => {
                        return <ServiceByCategoryCard service={service} reserveService= {reserveService}/>
                    }):
                    <NoResult />
                }
                
            </Container>
            
            </div>
            {
                filter !== "" &&
                    <Reservation reserveServiceClose={reserveServiceClose} serviceId = {serviceId} selectedServiceServiceDetails={selectedServiceServiceDetails} mainImage={mainImage}/>
                }
            </>:
            <Loading />
        }
        
    </div>
  )
}
