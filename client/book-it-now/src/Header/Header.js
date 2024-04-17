import { faL, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './HeaderStyle.css'
import SearchBar from '../SearchBar/SearchBar';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const isAuthenticated = useAuthUser()

  useEffect(() => {
    const handleScroll = (event) => {
        if(window.scrollY > 250){
            setShowSearchBar(true)
        }else{
            setShowSearchBar(false)
        } 
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <Navbar  sticky='top' style={{backgroundColor : '#f1f1ef'}}>
          <Container fluid>
            <Navbar.Brand href="/" className='brandName'>Book it Now</Navbar.Brand>
            <Nav className="justify-content-end flex-grow-2 pe-3 " >
            <Nav.Link href="/" className='accountLink'>
                  <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    size='lg' 
                    style={{margin : '0 5px'}}
                /> Wyszukaj Salon
                </Nav.Link>
              {
                !isAuthenticated?
                <Nav.Link href="/loginPanel" className='accountLink'>
                  <FontAwesomeIcon icon={faUser} size='lg' style={{margin : '0 5px'}}/>Zaloguj / Załóz Konto
                </Nav.Link>:
                <Nav.Link href={`/accountPanel`} className='accountLink'>
                <FontAwesomeIcon icon={faUser} size='lg' style={{margin : '0 5px'}}/>Moje Konto
              </Nav.Link>
              }
                  
              <Nav.Link href="#action2" >
                <Button variant='light' size='md'>Dodaj swój biznes</Button> 
              </Nav.Link>
                  
            </Nav>
          </Container>
        </Navbar>
  )
}
