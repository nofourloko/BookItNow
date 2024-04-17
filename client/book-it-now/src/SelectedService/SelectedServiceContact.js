import React from 'react'
import "./SelectedService.css"
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import WorkingHoursDiv from './WorkingHoursDiv'

export default function SelectedServiceContact({service}) {
  return (
    <div className='contactDiv'>
        <div className='addressRedirect'>
            <div>
                <span>
                    {service.id}
                </span>
                <span>
                    {service.addressString}
                </span>
            </div>
            <div >
                <FontAwesomeIcon icon={faLocationArrow} />
            </div>
        </div>
            <span style={{textAlign: 'center'}}>KONTAKT I GODZINY OTWARCIA</span>
        <div className='contactNumber'>
            <span><FontAwesomeIcon icon={faMobileScreen} /> {service.ContactNumber}</span> 
            <Button variant='outline-dark'>Zadzwoń</Button>
        </div>
        {
            service.workingHours.map(item => {
                return <WorkingHoursDiv Day={item} />
            })
        }
    </div>
  )
}
