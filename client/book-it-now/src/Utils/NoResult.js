import React from 'react'
import "./NoResult.css"
import { useNavigate } from 'react-router-dom'


export default function NoResult() {
    const navigate = useNavigate()
  return (
    <div className='noResultContainer'>
        <div className='noResultContainer'> 
            <span className='noResultHeader'>Nie znaleziono wyników</span>
            <span className='noResultLink' onClick={() => navigate("/")}>Wróć do strony głowej</span>
        </div>
        
    </div>
  )
}
