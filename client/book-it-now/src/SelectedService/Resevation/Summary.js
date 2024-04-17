import React from 'react'
import './Reservation.css'

export default function Summary({selectedServiceServiceDetails, procced, text}) {
  return (
    <div className='divSummarize'>
        <div className='divPriceSummarize'>
            <p>Łącznie: <span className='spanPrice'>{selectedServiceServiceDetails.price} zł</span></p>
        </div>
        <div className='DivProcced'>
            <button className='procedButton' onClick={() => procced()}>{text}</button>
        </div>
    </div>
  )
}
