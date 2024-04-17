import axios from 'axios'
import React, { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Alert, Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function UserVisitInfoComment({showComment,appointmentDetails}) {
    const [ comment, setComment ] = useState(null)
    const [ rate, setRate ] = useState(null)
    const [closeCommentSection, setCloseCommentSection] = useState("")
    const [success, setSuccess] = useState(appointmentDetails.commented? true : "")
    const user = useAuthUser()
    const navigate = useNavigate()

    const sendComment = async () => {
        const {Day, Month, Year} = appointmentDetails.selectedDate
        const {name} = appointmentDetails.service
        if(comment && rate){
            try{
                const commentObj = {
                    rating : rate,
                    comment : comment,
                    date : `${Day} ${Month} ${Year}`,
                    service : name,
                    place : appointmentDetails.place,
                    user : user.name.split(" ")[0]
                }

                const responseService = await axios.post("http://127.0.0.1:5000/services/service/addComment", commentObj )

                if(responseService.data !== 'ok'){
                    return
                }
                
                const responseUser = await axios.post("http://127.0.0.1:5000/users/addUserComment", {
                    userId : user.id,
                    commentObj : commentObj
                })

                if(responseUser.data !== 'ok'){
                    return
                }

                setCloseCommentSection("scale-out-center")
                setTimeout(() => {
                    setSuccess(true)
                },600)
            }catch(err){
                console.log(err)
            }
        }
    }

  return (
    <>
    {
        appointmentDetails.commented ? 
        <>
        {
            success ? 
            <Alert key={'success'} variant={'success'}>
                Komentarz dodany.{' '}
            <Alert.Link onClick={() => navigate('/accountPanel/comments')}>Zobacz swoje komentarze</Alert.Link>
          </Alert>: null
        } 
        </>
        :
        <div className={closeCommentSection}>
        <Row className={`g-2 ${showComment}`} >
            <Col xs={12}>
                <FloatingLabel controlId="floatingInputGrid" label="Komentarz obsługi">
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Komentarz obsługi" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
                </FloatingLabel>
            </Col>
            <Col md>
                <FloatingLabel
                controlId="floatingSelectGrid"
                label="Wybierz ocenę"
                >
                <Form.Select value = {rate} onChange={(e) => setRate(e.target.value)}>
                    <option>Otwórz pole wyboru</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
                </FloatingLabel>
            </Col>
            <Col xs={4}>
                <Button
                    variant="outline-success" 
                    size='lg'
                    style={{width: '100%', height: '100%'}}
                    onClick={() => sendComment()}
                    >
                    Dodaj komentarz
                    </Button>
            </Col>
            </Row>
            
        </div>
    }  
    </>
  )
}
