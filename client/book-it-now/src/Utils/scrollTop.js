import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import './scrollTopStyle.css'

export default function ScrollTop() {   
    const [showButton, setShowButton] = useState(false)

    function scrollTop(){
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const handleScroll = (event) => {
            if(window.scrollY > 250){
                setShowButton(true)
            }else{
                setShowButton(false)
            } 
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        showButton && (
            <Button
                variant='outline-dark' 
                className='scrollTopButton'
                style={{position: 'fixed', bottom: '70px',right: '40px'}}
                onClick={scrollTop}
            >
                <FontAwesomeIcon icon={faArrowUp}/>
            </Button>
        )
    );
}
