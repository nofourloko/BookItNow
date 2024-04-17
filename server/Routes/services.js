const express = require('express')
const servicesRouter = express.Router()
const path = require('path')
const { 
    getNewestServices, 
    getSelectedService, 
    getServiceByCategory,
    searchForServicesByPhrase,
    addNewComment,
    changeCommentReaction
} = require('../Controller/Firebase/firebase')




servicesRouter.get('/newestServicesList', async (req, res) => {
    try{
        const repsone = await getNewestServices()
        res.json(repsone)

    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})

const reviewsStats = (reviews) => {
    let reviewsCount = [0,0,0,0,0]
    let reviewsSum = 0;

    reviews.forEach(element => {
        let rating = parseInt(element.rating)
        reviewsSum += rating
        reviewsCount[rating - 1]++
    });
    console.log(reviews.length)
    let avgReview = reviewsSum != 0 ? parseFloat(reviewsSum / reviews.length).toFixed(2) : 0

    return {
        everyReviewRatingAmount : reviewsCount,
        reviewsAmount : reviews.length,
        reviewsAvg : avgReview
    }
}

servicesRouter.get('/selectedService/:id', async (req, res) => {
    const {id} = req.params

    try{
        const repsone = await getSelectedService(id)
        res.json({serviceData : repsone, reviewsStats : reviewsStats(repsone.reviews)})

    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})

servicesRouter.get('/service_by_category/:category', async (req, res) => {
    const {category} = req.params
    try{
        const repsone = await getServiceByCategory(category)
        res.json(repsone)

    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})


servicesRouter.get('/searchingService/:phrase', async (req,res) => {
    const {phrase} = req.params
    try{
        const respsone = await searchForServicesByPhrase(phrase)
        
       const res_obj = {
        status : false,
        fetchData : []
       }

       if(respsone.length > 0){
        res_obj.status = true
        res_obj.fetchData = respsone
    }

    res.json(res_obj)

    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})

servicesRouter.post("/service/addComment", async (req, res) => {
    const commentObj = req.body
    commentObj.dislikes = 0
    commentObj.likes = 0
    try{
        const response = await addNewComment(commentObj)
        res.json('ok')
    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})

servicesRouter.post('/changeCommentReactions', async (req, res) => {
    try{
        const {commentObj, charAction, serviceId } = req.body 
        const response = await changeCommentReaction(commentObj, charAction, serviceId)
        res.json('ok')
    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})

module.exports = servicesRouter