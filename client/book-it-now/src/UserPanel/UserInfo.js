import axios from 'axios';
import React, { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import AlertDismissibleExample from '../Utils/Alert';

/*
    Sprawdz endpointa i zobacz czy tak sie to robi z tymi tokenami
*/

export default function UserInfo() {
  const userId= useAuthUser()
  const signIn = useSignIn()
  const signOut = useSignOut()
  const [alertMsg, setAlertMsg] = useState()
  const [alertVariant, setAlertVariant] = useState('danger')
  const [close, setClose] = useState(false)
  const [email, setEmail] = useState(userId.email)
  const [phone, setPhone] = useState(userId.phone)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const changeData = async () => {
    if(password != userId.password){
        setAlertMsg({
            title : "Wystąpił błąd",
            text : "Podane hasło nie jest zgodne z zarejestrowanym na tym koncie"
        })
        setClose(true)
        return
    }
    

    const userObj = {
        userData : {
            name : userId.name,
            email : email,
            phone : phone,
            password : newPassword === "" ? password : newPassword
        },
        id: userId.id
    }

    try{
        const response = await axios.post("http://127.0.0.1:5000/users/changeUserData", {data : userObj})
        signOut()
        signIn({
            auth: {
                token: response.data.token,
                type: 'Bearer'
            },
            expiresIn : 3600,
            userState : response.data.authUserState,
        })
        changeDataSuccess()
        
    }catch(err){
        console.log(err)
    }

  }

  const changeDataSuccess = () => {
        setAlertMsg({
            title : "Sukces",
            text : "Pomyślnie udało się zmienić dane na twoim koncie. Zamknij okno, aby zaktualizowac dane"
        })
        setAlertVariant('success')
        setClose(true)
        setPassword("")
        setNewPassword("")
  }

  const closeAlert = (param) => {
    setClose(param)
    window.location.reload()
  }
    
  return (
    <div className='infoPageDiv' id='userPanelEntrance'>
        <AlertDismissibleExample closeAlert={closeAlert} val = {close} variant={alertVariant} msg={alertMsg}/> 
        <p>Twoje informacje:</p>
        <Form.Control size="lg" type="email" placeholder="Email:" value={email}  id='inputStyle' onChange={(e) => setEmail(e.target.value)}/>
        <Form.Control size="lg" type="text" placeholder="Numer telefonu:" value={phone}  id='inputStyle' onChange={(e) => setPhone(e.target.value)}/>
        <Form.Control size="lg" type="password" placeholder="Zmień Hasło:" value={newPassword}  id='inputStyle' onChange={(e) => setNewPassword(e.target.value)}/>
        <Form.Control size="lg" type="password" placeholder="Aktualne Hasło (wymagane do zmiany):" value={password}  id='inputStyle' onChange={(e) => setPassword(e.target.value)}/>

        <Button variant='outline-dark' className='buttonNext' onClick={() => changeData()}>Zmień dane</Button>
    </div>
  )
}
