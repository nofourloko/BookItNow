import React from 'react'
import "./SelectedService.css"

export default function WorkingHoursDiv({Day}) {
  return (
    <div className='workingHours'>
        <span> {Day.Day}</span>
        <span>{Day.StartingHours} { !Day.EndingHours ? "" : `: 00 - ${Day.EndingHours} : 00 `  }</span>
    </div>
  )
}
