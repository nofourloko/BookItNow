import React from 'react'
import './Reservation.css'

export default function ServiceDetail({selectedServiceServiceDetails}) {
  return (
    <div className='selectedServiceServiceDetailsDiv'>
        <span>
            {selectedServiceServiceDetails.desc}
        </span>
        <div>
            <span>
                {selectedServiceServiceDetails.price} zł
            </span>
            <span>
                {selectedServiceServiceDetails.time} minut
            </span>
        </div>
    </div>
  )
}
