import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './HeaderStyle.css'
import SearchBar from '../Utils/SearchBar';


export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false)

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
    <Navbar key={'lg'} expand={'lg'} className="mb-3"  fixed='top' style={{backgroundColor : '#053D38'}}>
          <Container fluid>
            <Navbar.Brand href="/" className='brandName'>Book it Now</Navbar.Brand>
            {
              showSearchBar &&
              <Nav className="justify-content-end flex-grow-1 pe-3 slide-in-fwd-top">
                <SearchBar />
              </Nav>
            }
            
                

            
            <Nav className="justify-content-end flex-grow-2 pe-3 " >
                  <Nav.Link href="#action1" className='accountLink'>
                        <FontAwesomeIcon icon={faUser} size='lg' style={{margin : '0 5px'}}/>zaloguj / załóz konto
                    </Nav.Link>
                  <Nav.Link href="#action2" >
                    <Button variant='light' size='md'>Dodaj swój biznes</Button> 
                  </Nav.Link>
                  
                </Nav>
          </Container>
        </Navbar>
  )
}
