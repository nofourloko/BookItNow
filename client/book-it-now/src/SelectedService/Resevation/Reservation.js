import React, { useContext, useEffect, useState } from 'react'
import './Reservation.css'
import RigthArrow from "./right-arrow.png"
import LeftArrow from "./left-arrow.png"
import DayCard from './DayCard'
import axios from 'axios'
import FreeHoursInDay from './FreeHoursInDay'
import ServiceDetail from './ServiceDetail'
import Summary from './Summary'
import Loading from '../../Utils/loading'
import AlertDismissibleExample from '../../Utils/Alert'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import ReservationRedirect from './ReservationRedirect'
import ReservationFinal from './ReservationFinal'

export default function Reservation({reserveServiceClose, serviceId, selectedServiceServiceDetails,mainImage}) {
  const isAuth = useIsAuthenticated()
  const [startIndex, setStartIndex] = useState(0)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedHour, setSelectedHour] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [Days, setDays] = useState()
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/calendar/getServiceCalendar/${serviceId}`)
        setDays(response.data.Days)
        setSelectedDay(response.data.Days[0])
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[])

  const closeAlert = () => setShowAlert(false)

  const daySelection = (selected) => {
    if(typeof selected === 'number'){
      setSelectedDay(Days[selected])
      setSelectedHour("")

      return
    }

    //Tylko odnosnie aktualnego dnia, jezeli nie ma wolnych terminow
    //Zmieniamy na następny dzień

    if(selectedDay !== selected){
      setSelectedDay(selected)
      setSelectedHour("")
    }
   
    
  }

  const selectedReservationInfo = () => {
    if(!selectedHour){
      setShowAlert(true)
      return
    }

    setShowFinal(true)
  }

  const reservationFinalBackButton = () => setShowFinal(false)

  const hourSelection = (hour) => setSelectedHour(hour)
  return (
    <div className='serviceReserveDiv'>
      {
        isAuth ?
        //Sprawdzenie czy uzytkownik jest zalogowany
        <>
        {
           showFinal === true?

           <ReservationFinal 
           mainImage = {mainImage}
           serviceId = {serviceId}
             Service={selectedServiceServiceDetails} 
             _Date={selectedDay} 
             Hour={selectedHour}
             reserveServiceClose={reserveServiceClose}
             reservationFinalBackButton = {reservationFinalBackButton}
             />:
          Days ?
          //Tutaj wyswietla sie dopiero gdy request zwroci wartosc
          <>
            <div className='serviceReserveHeader'>
                <span/>
                <span style={{textAlign:'center'}}>
                  Marzec
                </span>
                <span className='spanClose' onClick={() => reserveServiceClose()}>
                  X
                </span>
              </div>
              <div className='divPickDay'>
                <img src={LeftArrow} alt="leftArrow" onClick={() => {
                  if(startIndex != 0){
                    setStartIndex(prev => prev -= 5)
                  }
                }}/>
                  {
                    Days.map((item, index) => {
                      if(index >= startIndex && index < startIndex + 5){
                        return <DayCard 
                                    _Date={item} 
                                    daySelection={daySelection} 
                                    seledtedDay={selectedDay} 
                                    i={index}/>
                      }
                      
                    })
                  }
                <img src={RigthArrow} alt="rigthArrow" onClick={() =>{ 
                  if(startIndex + 5 < Days.length){
                    setStartIndex(prev => prev += 5)}
                  }
                  }/>
              </div>
              <FreeHoursInDay 
                selectedDay={selectedDay} 
                hourSelection={hourSelection} 
                selectedHour={selectedHour} 
                selectedServiceServiceDetails ={selectedServiceServiceDetails}
                />
              <ServiceDetail selectedServiceServiceDetails ={selectedServiceServiceDetails}/>
              <AlertDismissibleExample 
                val={showAlert} 
                closeAlert={closeAlert} 
                variant = 'danger' 
                msg = {{
                  title : 'Wystąpił błąd',
                  text: "Wybierz godzinę, w której odbędzie się ta usługa"
                }} />
              <Summary 
                selectedServiceServiceDetails ={selectedServiceServiceDetails}
                procced = {selectedReservationInfo}
                text={"Dalej"}
              />
          </>: 
            //Finalizacja rezerwacji 
            <Loading />
        }
      </>:
      <ReservationRedirect reserveServiceClose ={reserveServiceClose}/>
      
    }
    </div>     
  )
}
// const Days = [
//   {
//     Day : "Wt",
//     WeekDay : 1
//   },
//   {
//     Day : "Wt",
//     WeekDay : 2
//   },
//   {
//     Day : "Wt",
//     WeekDay : 1
//   },
//   {
//     Day : "Wt",
//     WeekDay : 3
//   },
//   {
//     Day : "Wt",
//     WeekDay : 4
//   },
//   {
//     Day : "Wt",
//     WeekDay : 5
//   },
//   {
//     Day : "Wt",
//     WeekDay : 1
//   },
//   {
//     Day : "Wt",
//     WeekDay : 2
//   },
//   {
//     Day : "Wt",
//     WeekDay : 1
//   },
//   {
//     Day : "Wt",
//     WeekDay : 3
//   },
//   {
//     Day : "Wt",
//     WeekDay : 4
//   },
//   {
//     Day : "Wt",
//     WeekDay : 5
//   }
  
// ]