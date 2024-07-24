// The express app
require('dotenv').config()
const express = require('express')
const stubRoutes = require('./routes/stubs')

// Express app
const app = express()

// Middleware
// Logs incoming requests
app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// Routes
app.use('/api/stubs', stubRoutes)

// Listen for requests on port 
app.listen(process.env.PORT, () => {
    console.log('Listening on port 4000!')
})