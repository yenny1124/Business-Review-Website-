require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const restaurantRoute = require('./routes/restaurantRoute')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 3001; // default value if PORT not defined
// const MONGO_URL = process.env.MONGO_URL

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors())

// middleware to access json datatype
app.use(express.json())

app.use('/api/restaurants', restaurantRoute)
// app.use('/api/')

app.use(errorMiddleware)


// connect to mongoDB
mongoose.
connect("mongodb+srv://admin:4237@cluster0.mtzjf.mongodb.net/?retryWrites=true&w=majority") // the actual url is in env file
  .then(() => {
    console.log('Connected to MongoDB')
    //connect to port 
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
      })
}).catch((error)=>{
    console.log(error)
  })