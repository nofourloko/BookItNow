import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom'

export default function SearchBarResultCard({searchResultEl}) {
    const {name, img, address, id} = searchResultEl
    const path = `/service/${id}`
    const navigate = useNavigate()

  return (
    <div className='SearchBarResultCardContainer' onClick={() => navigate(path)}>
        <div className='SearchBarResultCardImgDiv'>
            <img src={img} className='SearchBarResultCardImg'/>
        </div>
        <div className='SearchBarResultCardTextDiv'>
            <span>{name}</span>
            <span>{address}</span>
        </div>
    </div>
  )
}
