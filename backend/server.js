// The express app
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dummyRoutes = require('./routes/dummies')
const embeddingRoutes = require('./routes/embeddings')
const puzzleRoutes = require('./routes/puzzles')

// Express app
const app = express()

// Middleware
// Serve frontend (ensure that a build of React app is available)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
// Parse requests so that body can be accessed later
app.use(express.json())

// Logs incoming requests
app.use((request, response, next) => {
    console.log(request.path, request.method)
    console.log(request.body)
    next()
})

// Routes
app.use('/api/', dummyRoutes)
app.use('/api/', embeddingRoutes)
app.use('/api/', puzzleRoutes)
// Handle React routing using catch-all route. Server serves the React app
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

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