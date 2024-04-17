const express = require('express')
const user_router = express.Router()
const Token = require("../Models/Token")
const jwt_token = require("jsonwebtoken")
const {userAppointmentObj} = require('../Models/UserAppointment')
const {
    checkEmail, 
    addUser,
    getData, 
    changeUserData,
    saveUserAppointment,
    addCommentUser,
    removeAppointment,
    removeAppointmentService
} = require('../Controller/Firebase/firebase')
require('dotenv').config()


user_router.post("/getAuth", async (req, res) => {
    try{
        const user = req.body
        const check = await checkEmail(req.body)
        if(check === false){
            return
        }
        const token = jwt_token.sign(user, process.env.JWT_SECRET ,{ expiresIn : '1h'})
        res.json({
            token : token,
            expiresIn : 3600,
            authUserState: {
                password : check.userData.password,
                email : check.userData.email,
                phone : check.userData.phone,
                name : check.userData.name,
                id : check.id
            },
        })


    }catch(err){
        res.status(501).json(err)
    }
})

user_router.post("/addUser", async (req, res) => {
    try{
        const response = await addUser(req.body)
        res.json({success : response})
    }catch(err){
        res.status(501).json(err)
    }
})

user_router.post("/userData", async (req, res) => {
    try{
        const {id} = req.body
        const response = await getData(id, 'users')
        res.json(response)
    }catch(err){
        res.status(501).json(err)
    }
})

user_router.post("/changeUserData", async (req,res) => {
    try{
        const { data } = req.body
        const response = await changeUserData(data)
        const token = jwt_token.sign({email : data.userData.email, password : data.userData.password}, process.env.JWT_SECRET , { expiresIn : '1h'})
        res.json({
            token : token,
            expiresIn : 3600,
            authUserState: {
                password : data.userData.password,
                email : data.userData.email,
                phone : data.userData.phone,
                name : data.userData.name,
                id : data.id
            }
        })

    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})

user_router.post("/addUserAppointment", async (req,res) => {
    try {
        const {
            id, 
            startingHour, 
            SelectedService, 
            userId, 
            SelectedDate, 
            salon_image, 
            reservationComment,
            AppointmentId,
        } = req.body

        const appointmetObj = userAppointmentObj
        appointmetObj.selectedDate = SelectedDate
        appointmetObj.place = id
        appointmetObj.startingHour = startingHour
        appointmetObj.service = SelectedService
        appointmetObj.salon_image = salon_image
        appointmetObj.AppointmentComment = reservationComment
        appointmetObj.AppointmentId = AppointmentId

        const response = await saveUserAppointment(appointmetObj, userId)
        res.json({res : true})
    } catch (err) {
        console.log(err)
        res.status(501).json(err)
    }
})

user_router.get("/getUserAppointments/:id" , async (req, res) => {
    try {
        const { id } = req.params
        const { appointments } = await getData(id, 'users')
        res.json(appointments)
    } catch (err) {
        console.log(err)
        res.status(501).json(err)
    }
})


user_router.post("/addUserComment", async (req, res) => {
    try {
        const {userId, commentObj} = req.body
        const response = await addCommentUser(commentObj,userId)
        res.json({res : true})
    } catch (err) {
        console.log(err)
        res.status(501).json(err)
    }
})

user_router.get("/getUserComments/:id" , async (req, res) => {
    try {
        const { id } = req.params
        const { comments } = await getData(id, 'users')
        res.json(comments)
    } catch (err) {
        console.log(err)
        res.status(501).json(err)
    }
})

user_router.post("/serviceCancelletion", async (req, res) => {
    try {
        const {appointmentDetails , userID} = req.body

        const responseUser = await removeAppointment(appointmentDetails, userID)
        const responseService = await removeAppointmentService(appointmentDetails.place, appointmentDetails.AppointmentId)

        res.json({res : 'success'})
    } catch (err) {
        console.log(err)
        res.status(501).json(err)
    }
})


module.exports = user_router