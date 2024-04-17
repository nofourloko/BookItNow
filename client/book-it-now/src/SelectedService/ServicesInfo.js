import React from 'react'
import './SelectedService.css'
import { Button } from 'react-bootstrap'

export default function ServicesInfo({serviceInfo, reserveService, id = null, mainImage =null}) {
    const pTagStyleTop = {
        fontSize : '20px',
        fontWeight: '300',
        margin : '0px'
    }

    const pTagStyleBottom = {
        fontSize : '15px',
        margin : '0px',
        textAlign : 'right'
    }
  return (
    <div className='ServicesInfoDiv'>
        <div className='ServicesInfoDivInfo'>
            <p style={pTagStyleTop}>{serviceInfo.name}</p>
            <p style={pTagStyleBottom}>{serviceInfo.desc}</p>
        </div>
        <div className='ServicesInfoDivPrice'>
            <div>
                <p style={pTagStyleTop}>{serviceInfo.price} zł</p>
                <p style={pTagStyleBottom}>{serviceInfo.time} minut</p>
            </div>
            <div>
                <Button variant='outline-primary' size={'sm'} onClick={() => reserveService(serviceInfo,id, mainImage)}>Umów</Button>
            </div>
            
        </div>
    </div>
  )
}
