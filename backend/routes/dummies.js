// Placeholder file for temp routes
const express = require('express')
const {getDummies, createDummy, updateDummy, deleteDummy} = require('../controllers/dummyControllers')

const router = express.Router()

// GET stub
router.get('/stub', (request, response) => {
    response.json({message: 'GET stub'})
})

// POST stub
router.post('/stub', (request, response) => {
    response.json({message: 'POST stub'})
})

// GET all dummy documents
router.get('/dummy', getDummies)

// POST a dummy document
router.post('/dummy', createDummy)

// PATCH a dummy document by ID
router.patch('/dummy/:id', updateDummy)

// DELETE a dummy document by ID
router.delete('/dummy/:id', deleteDummy)

module.exports = router