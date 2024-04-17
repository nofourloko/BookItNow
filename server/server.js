const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const servicesRouter = require('./Routes/services');
const infoRouter = require("./Routes/info");
const userRouter = require("./Routes/users");
const calendarRouter = require("./Routes/calendar")
const cors = require('cors');

app.use("*", (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('./uploads'));
app.use("/services", servicesRouter);
app.use("/info", infoRouter);
app.use("/users", userRouter);
app.use("/calendar", calendarRouter)

const port = 5000;




app.listen(port, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log(`Server is running on port ${port}`);
});

// app.get("/dodanie", async (req, res) => {
//     let arrayOfObjects = [];
//     let days_in_current_month = parseInt(new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate())
//     console.log(typeof days_in_current_month)
//     let dayWeeks = [
//         {short: "Pn", full: "Poniedziałek"},
//         {short: "Wt", full: "Wtorek"},
//         {short: "Śr", full: "Środa"},
//         {short: "Czw", full: "Czwartek"},
//         {short: "Pt", full: "Piątek"},
//         {short: "Sb", full: "Sobota"},
//         {short: "Nd", full: "Niedziela"}
//       ];

//     let hours = [
//         {
//             hour : "09:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "10:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "11:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "12:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "13:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "14:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "15:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "16:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "17:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "18:00",
//             isFree : true,
//             serviceTime : 0
//         },
//         {
//             hour : "19:00",
//             isFree : true,
//             serviceTime : 0
//         },
//     ]
//     let j = 0
//     for (let i = 0; i < days_in_current_month; i++) {
//         if(j === dayWeeks.length){
//             j = 0
//         }

//         const monthsInPolish = [
//             "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
//             "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
//           ];
          
//           const currentDate = new Date();
//           const currentMonthIndex = currentDate.getMonth();
//           const currentMonthInPolish = monthsInPolish[currentMonthIndex];

//         arrayOfObjects.push({
//             Month : currentMonthInPolish,
//             Year : new Date().getFullYear(),
//             Day : i + 1,
//             DayWeek: dayWeeks[j].short,
//             DayWeekFull: dayWeeks[j].full   ,
//             Hours : hours
//         });
//         j++
//     }

//     await calendar(arrayOfObjects, "Martini Nails Marta Jaworska")
//     res.json("ok")
// })

