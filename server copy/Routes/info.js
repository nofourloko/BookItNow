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

infoRouter.get('/infoCardDetails', (req, res) => res.json(infoDetails))

module.exports = infoRouter