import React from 'react'

export default function ServiceCard({image, service}) {
  return (
    <div className='serviceCard'>
        <img src={image} style={{background: 'white', borderRadius: '10px'}}/>
        <p>{service}</p>
    </div> 
  )
}
