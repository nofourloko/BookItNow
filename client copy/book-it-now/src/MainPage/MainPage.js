import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import MainPageSearchBar from './MainPageSearchBar/MainPageSearchBar'
import MainPageInfoCard from './MainPageInfoCard/MainPageInfoCard'
import axios from 'axios'

export default function MainPage() {
  const [infoCardDetailsList, setInfoCardDeatailsList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const repsone = await axios.get('http://127.0.0.1:5000/info/infoCardDetails')
        console.log(repsone.data)
        setInfoCardDeatailsList(repsone.data)
      } catch (error) {
        console.log(error)
        window.location.href = '/error'
      }
      
    }

    fetchData()
  },[])
  return (
    <>
        <MainPageSearchBar />
        {
          infoCardDetailsList &&  infoCardDetailsList.map((item, index) => <MainPageInfoCard InfoCardDetails = {item} Index = {index}/>)
        }
        
    </>
  )
}
