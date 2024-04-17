import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MainPageSearchBar from './MainPageSearchBar/MainPageSearchBar'
import MainPageInfoCard from './MainPageInfoCard/MainPageInfoCard'
import axios from 'axios'
import "./MainPage.css"
import MainPageServiceList from './MainPageServiceList/MainPageServiceList'
import ServiceCard from './ServiceCard/ServiceCard'
import Header from '../Header/Header'
import Loading from '../Utils/loading'


export default function MainPage() {
  const [infoCardDetailsList, setInfoCardDeatailsList] = useState([])
  const [serviesCategories, setServicesCategories] = useState([])
  const [addIdName, setAddIdName] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repsone = await axios.get('http://127.0.0.1:5000/info/infoCardDetails')
        console.log(repsone.data)
        setInfoCardDeatailsList(repsone.data.infoDetails)
        setServicesCategories(repsone.data.serviesCategories)
      } catch (error) {
        console.log(error)
        // window.location.href = '/error'
      }
      
    }

    fetchData()

    const handler = () => {
      if(window.scrollY > 600){
        setAddIdName("divCategoriesHovered")
      }
      
    }

    window.addEventListener('scroll', handler)

    return () => {
        window.removeEventListener('scroll', handler)
    }
  },[])
  return (
    <>
    <Header />
    {
      serviesCategories.length > 0 ?
    <div style={{width : '100vw'}}>
        <MainPageSearchBar />
        <MainPageServiceList />

        <div className='divCategoriesImage'>
          <p className='divCategoriesTitle'>Wybierz usługę na podstawie kategorii</p>
          <div className='divCategories' id={addIdName}>  
          {
          serviesCategories.map(item => {
            return <ServiceCard image={item.image} service={item.service}/>
          })
          }
          </div>
        </div>
       

        {
          infoCardDetailsList &&  infoCardDetailsList.map((item, index) => <MainPageInfoCard InfoCardDetails = {item} Index = {index}/>)
        }

        
    </div>:
    <Loading />
    }
    </>
  )}
