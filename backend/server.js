// The express app
require('dotenv').config()
const express = require('express')
const dummyRoutes = require('./routes/dummies')
const embeddingRoutes = require('./routes/embeddings')
const puzzleRoutes = require('./routes/puzzles')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')

// Express app
const app = express()

// Middleware
// Parse requests so that body can be accessed later
app.use(express.json())

// Logs incoming requests
app.use((request, response, next) => {
    console.log('Request path and method: ', request.path, request.method)
    console.log('Request body: ', request.body)
    next()
})

// Routes
app.use('/api/', dummyRoutes)
app.use('/api/', embeddingRoutes)
app.use('/api/', puzzleRoutes)
app.use('/api/', userRoutes)

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

// Handling connection events
const db = mongoose.connection;
 
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
 
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});