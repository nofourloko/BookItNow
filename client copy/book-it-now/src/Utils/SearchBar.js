import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default function SearchBar() {
  return (
    <InputGroup>
        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
            <Form.Control
                placeholder="Szukaj usług i biznesów"
                aria-label="Szukajusługibiznesów"
                aria-describedby="basic-addon1"
            />
    </InputGroup>
  )
}
