import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import "./UserPanel.css"
import UserVistInfo from './UserVistInfo';
import Loading from '../Utils/loading';
import NoResult from '../Utils/NoResult';


export default function UserVisits() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState()
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false)
  const userVistInfoRef = useRef(null)
  const userVisitsRef = useRef(null)
  const {id} = useAuthUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/users/getUserAppointments/${id}`)
        setAppointments(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
    }
    fetchData()
  },[]) 

  const closeSelectedVisit = () => {
    userVistInfoRef.current.classList.remove('scale-in-center')
    userVistInfoRef.current.classList.add('roll-out-right')
    setTimeout(() => {
      setShowAppointmentDetails(false)
    },600)
  }

  const showAppointment = (item) => {
    
    setShowAppointmentDetails(item)
    
   
  }

  return (
    <>
    {appointments ? 
      <div className='divVistsContainer userPanelEntrance'  ref={userVisitsRef}>
        <span className='divVistsContainerHeader'>Twoje wizyty</span>
        { 
          
          !showAppointmentDetails && appointments.length > 0?
          <>
            
            <div className='divVists'>
              {
                appointments.map(item => {
                  return (
                    <div className='divVistsItem'>
                      <img src={item.salon_image} />
                      <span className='divVistsItemHeader'>Wizyta w {item.place}</span>
                      <span>{item.selectedDate.DayWeekFull} {item.selectedDate.Day} {item.selectedDate.Month} {item.selectedDate.Year}</span>
                      <button className='procedButton' onClick={() => showAppointment(item)}>Pokaz szczegóły</button>
                    </div>
                  )
                })
              }
            </div>
          </>:
          appointments.length === 0 ? 
              <NoResult />
          : 
          <div ref= {userVistInfoRef} className='scale-in-center'>
            <UserVistInfo  appointmentDetails = {showAppointmentDetails} closeSelectedVisit = {closeSelectedVisit}/>
          </div>
        }
       
      </div>:
      <Loading />
      }
    </>
    
  )
}
