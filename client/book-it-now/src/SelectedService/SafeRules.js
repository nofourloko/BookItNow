import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SafeRulesCard from './SafeRulesCard'

export default function SafeRules() {
    const [rules, setRules] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/info/safeRules")
            setRules(response.data)
        }

        fetchData()
    },[])
  return (
    <Col xs = {12} style={{margin : '5% auto'}}>
        <Row>
            <p style={{fontSize : '24px', fontWeight: 'bolder'}}>Zasady bezpieczeństwa</p>
           {
                rules && rules.texts.map(item => {
                    return <SafeRulesCard text={item} img={rules.image} />
                })
            } 
        </Row>
        
    </Col>
  )
}
