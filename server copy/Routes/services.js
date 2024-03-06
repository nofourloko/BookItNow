const express = require('express')
const servicesRouter = express.Router()
const path = require('path')

const getServices = () => {
    return [
        {
            service : 'Fryzjer',
            image : 'http://127.0.0.1:5000/uploads/salon.png'
        },
        {
            service : 'Barber shop',
            image : 'http://127.0.0.1:5000/uploads/barbershop.png'
        },
        {
            service : 'Salon Kosmetyczny',
            image : 'http://127.0.0.1:5000/uploads/hairdresser.png'
        },
        {
            service : 'Paznokcie',
            image : 'http://127.0.0.1:5000/uploads/nail-polish.png'
        },
        {
            service : 'Brwi i rzęsy',
            image : 'http://127.0.0.1:5000/uploads/mascara-wand.png'
        },
        {
            service : 'Masaz',
            image : 'http://127.0.0.1:5000/uploads/body-massage.png'
        },
        {
            service : 'Zwierzaki',
            image : 'http://127.0.0.1:5000/uploads/pet.png'
        },
        {
            service : 'Fizjoterapia',
            image : 'http://127.0.0.1:5000/uploads/physical-therapy.png'
        },
        {
            service : 'Wiecej',
            image : 'http://127.0.0.1:5000/uploads/menu.png'
        },
        
    ]
}

servicesRouter.get('/servicesList', async (req, res) => {
    try{
        const serviesList = await getServices()
        res.json(serviesList)

    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
})




module.exports = servicesRouter