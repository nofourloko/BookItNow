const express = require('express')
const calendarRouter = express.Router()
const {getData, calendar} = require("../Controller/Firebase/firebase")
const {CalendarAppointment} = require("../Models/CalendarAppointent")
const crypto = require("crypto");

function createHash(len) {
    return crypto.createHash("shake256", { outputLength: len }).digest("hex");
}

const getCalendarInfo = async (id, fromCurrentDay = true) => {
    try{
        const currentDay = parseInt(new Date().getDate())
        const calendarData = await getData(id,'calendars')

        if(fromCurrentDay === true){
            calendarData.Days = calendarData.Days.filter((item,index) => index >= currentDay - 1)
        }
        

        return calendarData
    }catch(err){
        throw new Error(err)
    }   
}

calendarRouter.get("/getServiceCalendar/:id", async (req,res) => {
    try{
        const id = req.params.id
        const calendarData = await getCalendarInfo(id)

        res.json(calendarData)
    }catch(err){
        res.status(501).json(err)
    }
})


calendarRouter.post("/saveAppointment", async (req,res) => {
    try {
        const { HoursTaken, SelectedDate, id, reservationComment, SelectedService } = req.body;
        const calendarData = await getCalendarInfo(id, false);
    
        calendarData.Days = calendarData.Days.map((item, index) => {
            if (item.Day === SelectedDate.Day) {
                HoursTaken.forEach(hour_el => {
                    item.Hours.forEach(day_hour_el => {
                        if (day_hour_el.hour === hour_el.hour) {
                            day_hour_el.isFree = false;   
                        }
                    });
                });
            }
            return item;
        });

        CalendarAppointment.hoursTaken = HoursTaken
        CalendarAppointment.AppointmentComment = reservationComment
        CalendarAppointment.DateTaken = `${SelectedDate.Day} ${SelectedDate.Month} ${SelectedDate.Year}`
        CalendarAppointment.Service = SelectedService
        CalendarAppointment.appointment_id = createHash(15)

        const repsone = await calendar(calendarData.Days, id, CalendarAppointment)
        res.json({res : true, appointment_id : CalendarAppointment.appointment_id});
        
    } catch (err) {
        res.status(501).json(err);
    }
    
})

module.exports = calendarRouter