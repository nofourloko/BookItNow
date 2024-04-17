import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowDown91, faArrowUp, faArrowUpFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './SearchBar.css'
import SearchBarResultCard from './SearchBarResultCard';

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState([])
  const searchingResultContainer_ref = useRef()

  const hideResultDiv = () => {
    setSearchResult([])
    searchingResultContainer_ref.current.disabled = true
  }

  const searchForResult = async (e) => {
    const phrase = e.target.value
    console.log(typeof phrase)
    if(phrase === ""){
      hideResultDiv()
      return
    }
    
    try {
      const response = await axios.get(`http://127.0.0.1:5000/services/searchingService/${phrase}`)
      console.log(response.data)
      if(response.data.status === true){
        setSearchResult(response.data.fetchData)
        searchingResultContainer_ref.current.disabled = false
      }else{
        hideResultDiv()
      }

      
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
       <InputGroup>
        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
            <Form.Control
                placeholder="Szukaj usług i biznesów"
                aria-label="Szukajusługibiznesów"
                aria-describedby="basic-addon1"
                onChange={(e) => searchForResult(e)}
            />
      </InputGroup>
          <div className='searchingResultContainer scale-in-ver-top' ref={searchingResultContainer_ref}>
            <div className='searchingResultDiv'> 
              {
                  searchResult && searchResult.map(el => {
                    return <SearchBarResultCard searchResultEl={el}/>
                  })
              }
            </div>
          </div>
      
      

    </>
   
  )
}
