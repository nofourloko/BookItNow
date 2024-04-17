const express = require('express')
const infoRouter = express.Router()

const infoDetails = [
    {
        header : "Umów się online",
        p1 : `Chcesz umówić się do fryzjera, barbera, stylistki paznokci 
        lub salonu masażu w okolicy? Szukasz miejsca, w którym najlepsi 
        specjaliści zadbają o Twoją brodę, brwi lub zrobią relaksujący masaż?`,
        p2: `Book It Now to darmowa aplikacja do rezerwacji, dzięki której z 
        łatwością znajdziesz wolny termin i wygodnie umówisz się na wizytę. 
        Bez dzwonienia — rezerwujesz o każdej porze i z dowolnego miejsca.`,
        footer : `Odkrywaj nowe miejsca w okolicy i umawiaj się na wizyty z Book It Now!`,
        image : "http://127.0.0.1:5000/uploads/Photo1.jpg"
    },
    {
        header : "Coś Ci wypadło? Nie szkodzi!",
        p1 : `Pobierz Booksy — darmową aplikację do rezerwacji — i zarządzaj swoimi wizytami, 
        gdziekolwiek jesteś. Zmień termin wizyty lub odwołaj rezerwację bez dzwonienia. `,
        p2: `Wiemy, że każdego dnia dużo się u Ciebie dzieje, dlatego będziemy wysyłać Ci przypomnienia 
        o nadchodzących wizytach. Dzięki nim nigdy nie przegapisz terminu!`,
        footer : "",
        image : "http://127.0.0.1:5000/uploads/Photo2.jpg"
    },
    {
        header : "Najlepsi specjaliści w okolicy",
        p1 : `Dowiedz się o nich więcej — sprawdź ich profile na Booksy, przeczytaj 
        opinie innych klientów i przejrzyj portfolio.  `,
        p2: `Oszczędzaj czas i niczym się nie przejmuj! Z Booksy rezerwacja 
        wizyt jest darmowa i dziecinnie prosta.`,
        footer : "",
        image : "http://127.0.0.1:5000/uploads/Photo3.jpg"
    }
]

const rulesInfo = {
    image : "http://127.0.0.1:5000/uploads/shield.png",
    texts : [
        "Wizyty tylko po wcześniejszej rezerwacji",
        "Pracownicy noszą maseczki ochronne",
        "Pracownicy noszą rękawiczki jednorazowe",
        "Wszystkie powierzchnie w salonie są dezynfekowane",
        "Dezynfekcja stanowiska po każdej wizycie",
        "Wentylacja pomieszczenia"
    ]
}

const getServices = () => {
    return [
        {
            service : 'Fryzjer',
            image : 'http://127.0.0.1:5000/uploads/venti-views-ITsb88_rRU0-unsplash.jpg'
        },
        {
            service : 'Barber shop',
            image : 'http://127.0.0.1:5000/uploads/barbershop.jpg'
        },
        {
            service : 'Kosmetyczka',
            image : 'http://127.0.0.1:5000/uploads/oliver-johnson-yH0dth2yEQE-unsplash.jpg'
        },
        {
            service : 'Paznokcie',
            image : 'http://127.0.0.1:5000/uploads/kartik-gada--4iMX-4MIZ8-unsplash.jpg'
        },
        {
            service : 'Brwi i rzęsy',
            image : 'http://127.0.0.1:5000/uploads/photo_tatti-dAsIdAIuWHE-unsplash.jpg'
        },
        {
            service : 'Masaz',
            image : 'http://127.0.0.1:5000/uploads/toa-heftiba-a9pFSC8dTlo-unsplash.jpg'
        },
  
        
    ]
}



infoRouter.get('/infoCardDetails', (req, res) => {
    try{
        console.log(1)
        let services = getServices()
        res.json(
            {
                infoDetails : infoDetails,
                serviesCategories : services
            }
        )
    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
    
})
infoRouter.get("/safeRules", (req, res) => res.json(rulesInfo))

module.exports = infoRouter