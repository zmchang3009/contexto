// Placeholder file for temp routes
const express = require('express')
const Dummy = require('../models/dummyModel')

const router = express.Router()

// GET stub
router.get('/', (request, response) => {
    response.json({message: 'GET stub'})
})

// POST stub
router.post('/', (request, response) => {
    response.json({message: 'POST stub'})
})

// GET dummy documents
router.get('/dummy', async (request, response) => {
    try {
        const dummies = await Dummy.find()
        response.status(200).json(dummies)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
    
})

// POST a dummy document
router.post('/dummy', async (request, response) => {
    // Get data from request body
    const {text, rank} = request.body

    try {
        // Create and return a dummy document
        const dummy = await Dummy.create({text, rank})
        response.status(200).json(dummy)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
})

module.exports = router