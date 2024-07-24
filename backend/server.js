// The express app
require('dotenv').config()
const express = require('express')
const stubRoutes = require('./routes/stubs')
const mongoose = require('mongoose')

// Express app
const app = express()

// Middleware
// Parse requests so that body can be accessed later
app.use(express.json())

// Logs incoming requests
app.use((request, response, next) => {
    console.log(request.path, request.method)
    console.log(request.body)
    next()
})

// Routes
app.use('/api/stubs', stubRoutes)

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests on port 
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB. Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

