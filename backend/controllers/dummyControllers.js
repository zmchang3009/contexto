// Controllers for dummy routes to interact with dummies collection
const mongoose = require('mongoose')
const Dummy = require('../models/dummyModel')

// GET all documents
const getDummies = async (request, response) => {
    try {
        // Retrieve dummy documents and sort in ascending order of rank
        const dummies = await Dummy.find().sort({rank: 'asc'})
        response.status(200).json(dummies)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// POST new document
const createDummy = async (request, response) => {
    // Get data from request body
    const {text, rank} = request.body

    try {
        // Create and return a dummy document
        const dummy = await Dummy.create({text, rank})
        response.status(200).json(dummy)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// PATCH existing dummy
const updateDummy = async (request, response) => {
    const {id} = request.params

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such dummy'})
    }

    // Update dummy document with body of request
    const dummy = await Dummy.findOneAndUpdate({_id: id}, {
        ...request.body
    }, {new: true})

    if (!dummy) {
        return response.status(400).json({error: 'No such dummy'})
    }

    response.status(200).json(dummy)
}

// DELETE existing dummy
const deleteDummy = async (request, response) => {
    const {id} = request.params

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such dummy'})
    }

    // Delete dummy document 
    const dummy = await Dummy.findOneAndDelete({_id: id})

    if (!dummy) {
        return response.status(400).json({error: 'No such dummy'})
    }

    response.status(200).json(dummy)
}


module.exports = {
    getDummies,
    createDummy,
    updateDummy,
    deleteDummy
}