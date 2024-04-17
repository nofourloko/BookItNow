import React from 'react'
import "./Reservation.css"
import { useNavigate } from 'react-router-dom'


export default function ReservationSuccess({reserveServiceClose}) {
  const navigate = useNavigate()

  return (
    <div className='ReservationSuccessDiv'>
        <span>Udało się dokonać rezerwacji</span>
        <button className='buttonNextService' onClick={() => reserveServiceClose()}>Wybierz kolejną usługę</button>
        <button className='procedButton' onClick={() => navigate("/accountPanel")}>Zobacz swoje usługi</button>
    </div>
  )
}
