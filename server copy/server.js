const express = require('express')
const app = express()
const cors = require('cors')
const servicesRouter = require('./Routes/services')
const infoRouter = require("./Routes/info")
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('./uploads'))
app.use(express.urlencoded({ extended: false }))
app.use("/services", servicesRouter)
app.use("/info", infoRouter)

app.get("/", (req, res) => {
    res.json('ok')
})

app.listen(port, (err) => {
    if(err){
        throw new err
    }

    console.log(`Server is running on port ${port}`)
})