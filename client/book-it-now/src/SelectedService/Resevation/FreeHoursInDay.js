import React, {useState} from 'react'
import RigthArrow from "./right-arrow.png"
import LeftArrow from "./left-arrow.png"
import './Reservation.css'


export default function FreeHoursInDay({selectedDay, hourSelection, selectedHour, selectedServiceServiceDetails}) {
  const dayTimes = ["Rano", "Popołudnie", "Wieczór"]
  const [indexDayTime, setIndexDayTime] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [hours, setHours] = useState(parseInt(selectedServiceServiceDetails.time / 60) - 1)

  const selectedHourHandler = (e, s_index,selected_day_hours) => {
    e.currentTarget.style.backgroundColor = '#A1CAF1'
    let result = []
    for(let i = s_index; i <= s_index + hours; i++){
      result.push(selected_day_hours[i])
    }

    hourSelection(result)
  }

  const hourSelectionFilter = () => {
    //Dlugosc danej uslugi jako liczbe indexow godziny , które moze zając 
    let selected_day_hours = selectedDay.Hours.filter((item, index) => {
      if (item.isFree === true) {
        //Sprawdzenie czy godzina nie jest zajeta

        for(let i = 1; i <= hours ;i++){
          if(index + i != selectedDay.Hours.length){
            if(selectedDay.Hours[index + i].isFree === false){
              return false
           }
          }
          //Petla sprawdza czy dana godzina jest odpowiednia, czyli 
          //jezeli usluga trwa dwie godziny to godzina i godziny następne muszą być wolne

          const date = new Date();
          if (date.getDate() === selectedDay.Day) {
              const currentHours = date.getHours();
              const specifiedHours = Math.ceil(item.hour.split(":")[0], 10);
              if (specifiedHours > currentHours) {
                  return true; 
              }
          } else {
              return true; 
          }

          //Stricte do danego dnia
          //Czyli pokazanie tylko godzin, które są za aktualna godzina
      }
      return false;
  }})

  if(selected_day_hours.length === 0 ){
    return false
  }
  let tmp = [...selected_day_hours]
  selected_day_hours = selected_day_hours.map((item, index) => {
    if(index >= startIndex && index < startIndex + 4 ){
        return (
          <span className='hourSpan' 
                onClick={(e) => selectedHourHandler(e, index, tmp)}
                >{item.hour}
          </span>
        )
      }
  })

  //Tutaj wybieramy tylko 4 przedmioty 

  if(selected_day_hours.length === 0 ){
    setStartIndex(prev => prev += 4)
    setIndexDayTime(prev => prev += 1)  
  }else{
    return selected_day_hours
  }

  //Jezeli nie ma zadnych przedmitow, sprawdzamy kolejne 

}
  

  return (
    <>
      
      {/* <div className='TimeOfTheDayDiv'>
        To do poprawy
        {
          dayTimes.map((item,i) => {
            return <span 
                      style={{backgroundColor: indexDayTime === i ? "white" : null}}
                      onClick={() => {
                        if(i === indexDayTime){
                          return
                        }
                        let t = 1
                        if(indexDayTime > i){
                          if(indexDayTime - i === 2){
                              t += 1
                          }
                          setStartIndex(prev => prev -= t * 4)
                        }else{
                          if(indexDayTime + i === 2){
                            t += 1
                          }
                          setStartIndex(prev => prev += t * 4)
                        }
                        setIndexDayTime(i)
                        
                      }}
                      >{item}</span>
          })
        }
      </div> */}
      <div className='divPickDay'>
            <img src={LeftArrow} alt="leftArrow" onClick={() => {
              if(startIndex != 0){
                setStartIndex(prev => prev -= 4)
                setIndexDayTime(prev => prev -= 1)
              }
            }}/>
            {
              selectedDay &&  hourSelectionFilter() === false ? null : hourSelectionFilter()
            }
            
            <img src={RigthArrow} alt="rigthArrow" onClick={() =>{ 
              if(startIndex + 5 < selectedDay.Hours.length){
                setStartIndex(prev => prev += 4)}
                setIndexDayTime(prev => prev += 1)
              }
              }/>
          </div>
    </>
    
  )
}
