import React from 'react'
import './Reservation.css'

export default function TimeOfTheDay({index, changeIndexDayTime}) {
  const dayTimes = ["Rano", "Popołudnie", "Wieczór"]
  return (
    <div className='TimeOfTheDayDiv'>
        {
          dayTimes.map((item,i) => {
            return <span 
                      style={{backgroundColor: index === i ? "white" : null}}
                      onClick={() => changeIndexDayTime(i)}
                      >{item}</span>
          })
        }
    </div>
  )
}
