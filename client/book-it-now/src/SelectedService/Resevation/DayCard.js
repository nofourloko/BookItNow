import React, { useEffect, useState } from 'react'
import './Reservation.css'

export default function DayCard({noFreeSpace, _Date,daySelection,seledtedDay,i}) {
  const [spaceStyle, setSpaceStyle] = useState("")
  const [noSpace, setNoSpace] = useState(false)
  useEffect(() => {
    const original =_Date.Hours.length
    const actual = _Date.Hours.filter(item => {
      if (item.isFree === true) {
          const date = new Date();
          if (date.getDate() === _Date.Day) {
              const currentHours = date.getHours();
              const specifiedHours = parseInt(item.hour.split(":")[0], 10);
              if (specifiedHours > currentHours) {
                  return true; 
              }
          } else {
              return true; 
          }
      }
      return false;
  }).length

    if(actual > parseInt(original / 2)){
      setSpaceStyle("green")
    }else if(actual > parseInt((original / 2) / 2)){
      setSpaceStyle("yellow")
    }else{
      setSpaceStyle("orange")
    }

    //W zaleznsci od liczy terminow wyswietlamy pasek w danym kolorze

    if(actual  === 0){
      daySelection(i + 1)
      setNoSpace(true)
    }

  },[])

  const dateSelection = () => {
    if(noSpace === false){
      daySelection(_Date)
    }
  }

  return (
    <div 
      className='DayCard' 
      onClick={() => dateSelection()} 
      style={{backgroundColor: seledtedDay === _Date ? '#A1CAF1' : null}}
      >
        <p>{_Date.Day}</p>
        <p>{_Date.DayWeek}</p>
              {
                noSpace === true ? <span style={{fontSize: '12px'}}>BRAK MIEJSC</span> : 
                <div className='dayStatus'>
                  <div className={spaceStyle}/>
                </div>
              }
    </div>
  )
}
