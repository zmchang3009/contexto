// Placeholder file for temp routes
const express = require('express')

const router = express.Router()

// GET stub
router.get('/', (request, response) => {
    response.json({message: 'GET stub'})
})

// POST stub
router.post('/', (request, response) => {
    response.json({message: 'POST stub'})
})

module.exports = router