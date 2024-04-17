import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import "./errorPage.css"
import "./NoResult.css"


export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <>
      <Header/>
      
      <div className='errorPageContainer'>
        <div className='noResultContainer'> 
            <span className='errorPageHeader' style={{color: 'red'}}>Wystąpił błąd</span>
            <span className='errorPageMsg'>Ale spokojnie to nasz wina, te linki mogą się przydać:</span>
              <span className='noResultLink' onClick={() => navigate("/")}>Strona główna</span>
              <span className='noResultLink'onClick={() => navigate("/accountPanel")}>Konto</span>
        </div>
        
    </div>
    </>
  )
}
