import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserVisitInfoComment from './UserVisitInfoComment'
import axios from 'axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export default function UserVistInfo({appointmentDetails, closeSelectedVisit}) {
    const navigate = useNavigate()
    const delButtonRef = useRef(null)
    const userId = useAuthUser().id
    const {salon_image, place, startingHour} = appointmentDetails
    const {DayWeekFull, Day, Year, Month} = appointmentDetails.selectedDate
    const {price, name, desc, time} = appointmentDetails.service
    const [showComment, setShowComment] = useState(false)

    useEffect(() => {
        
        const disableButton = () => {
            delButtonRef.current.setAttribute('disabled', true);
            delButtonRef.current.style.backgroundColor = 'grey';
            setShowComment(true)
            
        }
        const currentDate = new Date()
        if(currentDate.getFullYear() > Year){
            disableButton()
            return
        }

        if(currentDate.getMonth() > Month){
            disableButton()
            return
        }

        if(currentDate.getDate() > Day){
            disableButton()
            return
        }
       
        
    },[])

    const service_cancellection = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/users/serviceCancelletion", {
                appointmentDetails : appointmentDetails,
                userID : userId
            } )

            if(response.data.res === "success"){
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
            navigate('/error')
        }
    }

  return (
   <>
   <div className='divVisitInfoHeaderContainer'>
    <span className='divVistsContainerHeader' >Wizyta w {place}</span>
    <span className='spanClose divVistsContainerHeader' id='spanClose' onClick={() => closeSelectedVisit()}>X</span>
   </div>
   
    <div className='userVisitInfoContainer'>
        <div>
            <img src={salon_image} className='userVisitInfoImg'/>
        </div>
        <div className='userVisitInfoText'>
            
            <span>Wybrana usługa : {name} - {time} minut</span>
            
            <span>Opis : {desc}</span>
            <span>{DayWeekFull} {Day} {Month} {Year}</span>
            <span>Godzina rozpoczęcia: {startingHour}</span>
            <span>Cena : {price}</span>
        </div>
    </div>
    <div className='userVisitInfoButtons'>
        <button className='procedButton' onClick={() => navigate(`/service/${place}`)}>Przejdz do salonu</button>
        <button 
            onClick={() => service_cancellection()}
            ref={delButtonRef}
            className='procedButton' 
            style={{background : '#800000'}}>Anuluj usługę</button>
        
    </div>
    {
        showComment &&
        <UserVisitInfoComment showComment={showComment} appointmentDetails = {appointmentDetails} />
    }
   </>
    
  )
}
