import React from 'react'
import "./ServiceCard.css"
import { useNavigate } from 'react-router-dom'
export default function ServiceCard({image, service}) {
  const navigate = useNavigate()
  return (
    <div className='serviceCard' onClick={() => navigate(`${service}`)}>
        <img src={image} style={{background: 'white', borderRadius: '100%', height: '150px', width: '150px'}}/>
        <span>{service}</span>
    </div> 
  )
}
