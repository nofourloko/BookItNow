import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import "./UserPanel.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Header from '../Header/Header';

export default function UserPanel({selectedComponent}) {
    const [userData, setUserData] = useState({})
    const signOut = useSignOut()
    const navigate = useNavigate()
    const loggedUser = useAuthUser()

    const logout = () => {
        signOut()
        navigate("/")
    }

    const userVisits = () => {
        const user_visits_href = "http://localhost:3000/accountPanel"

        if(window.location.href === user_visits_href){
            window.location.reload()
            return 
        }

        navigate('/accountPanel')
    }

  return (
    <>
    <Header />
    {
        userData && 
            <Row>
                <Col md={4}>
                    <div className='userSegments'>
                        <div className='userSegment greeting'>
                                <p>Witaj {loggedUser.name}</p>
                                <p className='phoneNumber'>{loggedUser.phone}</p>
                            </div>
                            <span className='userSegment' onClick={() => navigate("/")}>Powrót do strony głównej</span>
                            <span className='userSegment' onClick={() => userVisits()}>Wizyty</span>
                            <span className='userSegment'onClick={() => navigate('/accountPanel/comments')}>Opinie</span>
                            <span className='userSegment' onClick={() => navigate("/accountPanel/information")}>Ustwienia</span>                                <span className='userSegment' onClick={() => navigate("/accountPanel/privacy")}>Polityka prywatności</span>
                            <div id='userSegmentLogout' >
                                <span className='userSegment' id="userSegmentLogoutSpn" style={{color: 'red'}} onClick={() => logout()}>Wyloguj się</span>
                            </div>
                    </div>
                        
                    
                </Col>

                <Col md={8}>
                    {
                        selectedComponent
                    }
                </Col>
            </Row>
    }
    </>
  )
}
