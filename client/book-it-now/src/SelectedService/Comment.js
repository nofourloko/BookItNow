import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import StarFiled from "./starFiled.png"
import StarEmpty from "./starEmpty.png"
import "./SelectedService.css"
import LikeIcon from "./like.png"
import DisLikeIcon from "./dislike.png"
import axios from 'axios'

export default function Comment({item, userPanel = false, serviceId = null}) {
    const stars = ["","","","",""]
    const [likes, setLikes] = useState(item.likes)
    const [dislikes, setDisLikes] = useState(item.dislikes)
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const change_reactions = async (char_action) => {  
        try {
            setButtonDisabled(true)
            const response = await axios.post(`http://127.0.0.1:5000/services/changeCommentReactions`, {
                commentObj : item,
                charAction : char_action,
                serviceId : serviceId
            })

            if(response.data === 'ok'){
                if(char_action === "+"){
                    setLikes(prev => prev + 1)
                    item.likes = item.likes + 1
                }else{
                    setDisLikes(prev => prev + 1)
                    item.dislikes = item.dislikes + 1
                }
                setButtonDisabled(false)
            }
            

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <Row>
        <Col xs={12} >
            <div className='commentCard'>
               <div className='commentCardTopSection'>
                    <div>
                        {stars.map((el,index) => {
                            if(index < item.rating){
                                return <img src={StarFiled} />
                            }else{
                                return <img src={StarEmpty} />
                            }
                            })} 
                    </div>
                    <div>
                        <p>{item.user} 	&#8226; {item.date}</p>
                        
                    </div>
                    
                    </div>
                <div>
                    <p>{item.service}</p>
                    <p>{item.comment}</p>
                </div>
                {
                    !userPanel ?
                        <div className='commentButtonsDiv'>
                            <Button 
                                variant='outline-primary'
                                onClick={() => change_reactions("+")}
                                disabled={buttonDisabled}
                                size="sm">
                                    <span style={{textAlign: 'bottom'}}>{likes} 
                                        <img src={LikeIcon}/>
                                    </span>
                            </Button>

                            <Button  
                                variant='outline-primary'
                                disabled={buttonDisabled}
                                onClick={() => change_reactions("-")}
                                size="sm">
                                    <span>
                                        {dislikes} <img src={DisLikeIcon}/>
                                    </span>
                            </Button>
                        </div>: null
                } 
                
            </div>
            
            
        </Col>
    </Row>
  )
}
