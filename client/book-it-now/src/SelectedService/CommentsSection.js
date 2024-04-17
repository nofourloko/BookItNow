import React, { useEffect } from 'react'
import { Col, ProgressBar, Row } from 'react-bootstrap'
import Comment from './Comment'
import StarFiled from "./starFiled.png"
import StarEmpty from "./starEmpty.png"
import "./SelectedService.css"

export default function CommentsSection({comments, reviewStatistics, serviceId}) {
  const stars = ["","","","",""]
  const ratingsAmounts = reviewStatistics.everyReviewRatingAmount.map((item, index) => {
    return (
        <div className='divSingleRatingAmount'>
            <div style={{display: 'flex', alignItems: 'center', gap: '3px'}}>
               <span>{index + 1} </span> 
               <img src={StarFiled} style={{width: '10px', height: "10px"}}/>
            </div>
            
            <progress className= "progress" max={reviewStatistics.reviewsAmount} value={item}/>
            <span>{item}</span>
        </div>
    )
})

  return (
    <Col xs = {12} style={{margin : '5% auto'}}>
        <Row>
            <Col md={6} xs={12}>
                <p style={{fontSize : '24px', fontWeight: 'bolder'}}>Opinie</p>
                <p> 
                    Opinie pochodzą od zarejestrowanych użytkowników, którzy faktycznie skorzystali z 
                    danej usługi. Wyłącznie po zrealizowaniu danej usługi, zarejestrowany użytkownik
                    uzyskuje możliwość opublikowania opinii.
                </p>
            </Col>
            <Col md={6} xs={12}>
                <div className='reviewsStatsDiv'>
                    <div className='reviewsStatsInfo'>
                        <p style={{fontSize : '34px', margin: "0px"}}>{reviewStatistics.reviewsAvg}/5</p>
                        <div>
                          {stars.map((el,index) => {
                            if(index < parseInt(reviewStatistics.reviewsAvg)){
                                return <img src={StarFiled} />
                            }else{
                                return <img src={StarEmpty} />
                            }
                            })} 
                        </div>
                        <p style={{fontSize : '13px'}}>Na podstawie {reviewStatistics.reviewsAmount} opini</p>
                    </div>
                    <div className='reviewsStatsDivBox'>
                        {
                            ratingsAmounts.reverse()
                        }
                    </div>
                </div>
            </Col>
        </Row>
        {/* <Row>
            tutaj jakis taki do dodania komentarza
        </Row> */}
        {
            comments.map(item => {
                return <Comment item={item} serviceId={serviceId}/>
            })
        }
    </Col>
  )
}
