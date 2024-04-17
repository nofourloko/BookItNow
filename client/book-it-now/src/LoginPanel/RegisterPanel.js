import React, {useState} from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'

export default function RegisterPanel({getAuth}) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  
 
  const userAdd = async () => {
    try{
        const respone = await axios.post("http://127.0.0.1:5000/users/addUser", {
            email : email,
            name: name,
            phone: phone,
            password: password
        })
        console.log(respone.data)
        return respone.data.success
    }catch(error){
        console.log(error)
    }
  }
  

  const validition = async () => {
    try{
        const addUser = await userAdd(email, password)
        if(addUser === true){
            await getAuth(email, password)
        }
        
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className='loginPanelEmailEntryDiv'>
        <p>Rejestacja</p>
        <Form.Control size="lg" type="email" placeholder="Email:"  id='inputStyle' onChange={(e) => setEmail(e.target.value)}/>
        <Form.Control size="lg" type="text" placeholder="Imie i nazwisko:"  id='inputStyle' onChange={(e) => setName(e.target.value)}/>
        <Form.Control size="lg" type="text" placeholder="Numer telefonu:"id='inputStyle'  onChange={(e) => setPhone(e.target.value)}/>
        <Form.Control size="lg" type="password" placeholder="Ustaw hasło:" id='inputStyle' onChange={(e) => setPassword(e.target.value)} />
        <Button variant='outline-dark' className='buttonNext' onClick={() => validition()}>Dalej</Button>
    </div>
  )
}
