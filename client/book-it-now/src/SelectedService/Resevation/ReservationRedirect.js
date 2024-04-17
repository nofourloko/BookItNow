import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ReservationRedirect({reserveServiceClose}) {
  const navigate = useNavigate()
 
  const redirect = () => {
    reserveServiceClose()
    navigate("/loginPanel")
  }
  return (
    <>
        <div className='serviceReserveHeader'>
            <span/>
            <span />
            <span className='spanClose' onClick={() => reserveServiceClose()}>
                X
            </span>
        </div>
        <div className='divReservationLoginRedirect'>
            <span className='divReservationLoginRedirectHeader'>Zaloguj się lub Zajerestruj</span>
            <span>Aby zarezerwować termin</span>
            <button className='procedButton' style={{width: '50%'}}onClick={() => redirect()}>Dalej</button>
        </div>
    </>
    
  )
}
