import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useContext} from 'react'
import ServiceDetail from './ServiceDetail'
import Summary from './Summary'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../Utils/loading'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import ReservationSuccess from './ReservationSuccess'
import { FloatingLabel, Form } from 'react-bootstrap'


export default function ReservationFinal({
    mainImage,
    serviceId,
    _Date, 
    Service,
    Hour, 
    reserveServiceClose, 
    reservationFinalBackButton
}) {
    const navigate = useNavigate()
    const auth = useAuthUser()
    const [showLoading, setShowLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(true)
    const [lastHourIndexValue, setLastHourIndexValue ] = useState()
    const [reservationComments, setReservationComments] = useState("")
    useEffect(() => {
        console.log(mainImage, serviceId, _Date, Service, Hour)
        let sumUpTime = parseInt(Service.time, 10)- (Hour.length - 1) * 60
        console.log(sumUpTime)
        let lasthourSplited = Hour[Hour.length - 1].hour.split(":")
        let lastHour = parseInt(lasthourSplited, 10) + sumUpTime
        if(lastHour >= 60){
            lastHour = '00'
            setLastHourIndexValue(`${parseInt(lasthourSplited[0]) + 1 }:${lastHour}`)
        }
    },[])
    const reservationFinaliztion = async () => {
        try{
            setShowLoading(true)

            const responseSave = await axios.post(`http://127.0.0.1:5000/calendar/saveAppointment`, {
                id : serviceId,
                HoursTaken : Hour,
                SelectedDate : _Date,
                reservationComment : reservationComments,
                SelectedService : Service,
            })

            if(responseSave.data.res){
                const saveUserAppointment = await axios.post('http://127.0.0.1:5000/users/addUserAppointment',{
                    userId : auth.id,
                    id : serviceId,
                    startingHour: Hour[0].hour,
                    SelectedService : Service,
                    SelectedDate : _Date,
                    salon_image : mainImage,
                    reservationComment : reservationComments,
                    AppointmentId : responseSave.data.appointment_id
                })
                
                if(saveUserAppointment.data.res){
                    setShowSuccess(true)
                }
                
            }

        }catch(err){
            console.log(err)
            navigate("/error")
        }
    }
  return (
    <>
        {
            showLoading === false?
                <div className='serviceReserveContainer'>
                    <div className='serviceReserveHeader'>
                        <span onClick={() => reservationFinalBackButton()}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </span>
                        <span/>
                        <span className='spanClose' onClick={() => reserveServiceClose()}>
                            X
                        </span>
                    </div>
                    <div className='divReservationFinalInfo'>
                        <span className='divReservationFinalInfoHeader'>
                        {_Date.Month}, {_Date.DayWeekFull} {_Date.Day} {_Date.Year}
                        </span>
                        <span className='divReservationFinalInfoDetails'>{
                            `${Hour[0].hour} - ${lastHourIndexValue} (${Service.time} minut)`}
                        </span>
                        <span className='divReservationFinalInfoFooter'>
                            {serviceId}
                        </span>
                    </div>
                    <div className='ReservationComments'>
                         <FloatingLabel
                            controlId="floatingInput"
                            label="Uwagi dotyczące zamównienia"
                        >
                            <Form.Control 
                                as="textarea" 
                                value={reservationComments} 
                                onChange={(e) => setReservationComments(e.target.value)}/>
                        </FloatingLabel>
                    </div>
                       
                    <ServiceDetail selectedServiceServiceDetails ={Service}/>
                    <Summary
                            selectedServiceServiceDetails ={Service}
                            procced = {reservationFinaliztion}
                            text={"Potwierdz i umów"}
                        />
                </div>
            :
            showSuccess?
            <ReservationSuccess reserveServiceClose= {reserveServiceClose}/>
            :
            <Loading />
        }
    </>
    
  )
}
