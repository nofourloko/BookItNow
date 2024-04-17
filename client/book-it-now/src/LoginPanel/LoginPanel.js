import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import "./AuthenticationPanel.css"
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from 'axios'

export default function LoginPanel({getAuth}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Container className='loginPanelContainer'>
        <Row>
            <Col xs = {12}>
                <div className='loginPanelEmailEntryDiv'>
                    <p className='loginHeaderText'>Zaloguj się</p>
                    <Form.Control size="lg" type="email" placeholder="E-mail" id='inputStyle' onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Control size="lg" type="password" placeholder="Hasło" id='inputStyle' onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant='outline-dark' className='buttonNext' onClick={() => getAuth(email, password)}>Dalej</Button>
                </div>
            </Col>
        </Row>
    </Container>
  )
}
