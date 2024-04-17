import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import RegisterPanel from './RegisterPanel'
import "./AuthenticationPanel.css"
import axios from 'axios'
import LoginPanel from './LoginPanel'
import { useNavigate } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Header from '../Header/Header';
import Loading from '../Utils/loading'

export default function AuthenticationPanel() {
    const [showLogin, setShowLogin] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [panelInfoOne, setPanelInfoOne] = useState("Masz juz konto")
    const [panelInfoTwo, setPanelInfoTwo] = useState("Zaloguj sie")
    const signIn = useSignIn();
    const navigate = useNavigate();

    const getAuth = async (email,password) => {
        
        try{
            setShowLoading(true)
            const response = await axios.post("http://127.0.0.1:5000/users/getAuth", { email : email, password : password })
            signIn({
                auth: {
                    token: response.data.token,
                    type: 'Bearer'
                },
                expiresIn : 3600,
                userState : response.data.authUserState,
            })
            navigate(-1)
        }catch(error){
            navigate('/error')
            console.log(error)
        }
      }

    const changePanels = (e) => {
        if(showLogin === false){
            setPanelInfoOne("Nie masz konta? ")
            setPanelInfoTwo("Zajerestruj sie")
        }else{
            setPanelInfoOne("Masz juz konto?")
            setPanelInfoTwo("Zaloguj sie")
        }

        setShowLogin(prev => !prev)
    }
  return (
    <>
        <Header />
        <Container>
            <Row>
                <Col xs={10} style={{margin : '100px auto'}}>
                    <Row>
                        <Col xs={4}>
                            <div className='divPanelInfo'>
                                <span style={{fontSize: '32px'}}>{panelInfoOne}</span>
                                <span onClick={() => changePanels()}>{panelInfoTwo}</span>
                            </div>
                            
                        </Col>
                        <Col xs={8}>
                            {
                                !showLoading ?
                                showLogin ? 
                                    <LoginPanel getAuth = {getAuth} />:
                                    <RegisterPanel getAuth = {getAuth}/>
                                :
                                <Loading />
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </>
    
  )
}
