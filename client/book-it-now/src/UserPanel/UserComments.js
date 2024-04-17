import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate } from 'react-router-dom'
import Comment from '../SelectedService/Comment'
import "./UserPanel.css"
import Loading from '../Utils/loading'
import NoResult from '../Utils/NoResult'

export default function UserComments() {
    const user = useAuthUser()
    const [comments, setComments] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/users/getUserComments/${user.id}`)
                setComments(response.data)
                console.log(response.data)
              } catch (error) {
                console.log(error)
                navigate("/error")
              }
        }

        fetchData()
    },[])
  return (
    <>
    {
        comments ?
        <div className='divVistsContainer userPanelEntrance'>
        
            <>
                <span className='divVistsContainerHeader'>Komentarze uzytkownika {user.name} </span>
                {
                    comments.length > 0? 
                    <>
                            
                            {
                                comments.map(item => {
                                    return (
                                        <div className='userPanelUserComment'>
                                            <span onClick={() => navigate(`/service/${item.place}`)}>{item.place}</span>
                                            <Comment item={item}  userPanel= {true}/>
                                        </div>
                                    )
                                    
                                })
                            }
                        
                    </>: 
                    <NoResult />
                }
            </>
            
            
        
        </div>:
        <Loading />
    }
    </>
  )
}
