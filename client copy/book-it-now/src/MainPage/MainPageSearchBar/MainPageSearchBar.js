import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./MainPageSearchBarStyle.css"
import axios from 'axios';
import SearchBar from '../../Utils/SearchBar';
import ServiceCard from '../ServiceCard/ServiceCard';

export default function MainPageSearchBar() {
    const [servicesList, setServicesList] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const repsone = await axios.get('http://127.0.0.1:5000/services/servicesList')
                console.log(repsone.data)
                setServicesList(repsone.data)  
            }catch(err){
                console.log(err)
                window.location.href = "/error"
            }
            
        }

        fetchData()
    },[])
  return (
    <div className='mainPageSearchBarContainer'>
        <Container className='mainPageSearchBarContainer'>
        <div className='searchBarAndTextDiv'>
            <Row>
                <Col style={{margin: '2% auto', textAlign: 'center'}} xs={6}>
                    <h1 className='textAttention'>Zarezerwuj swój czas</h1>
                    <h4>Odkryj salony w okolicy</h4>
                </Col>
                <Row>
                    <Col style={{margin: '0 auto'}} xs={6}>
                        <SearchBar />
                    </Col>
                </Row>
            </Row>
            
        </div>
            
        <div className='servicesListContainer'>
                <Row >
                    <Col xs={12}>
                        <div className='servicesListDiv'>
                            {servicesList &&
                                servicesList.map(item => <ServiceCard image={item.image} service={item.service} />)
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            
        </Container>
    </div>
  )
}
