// Controllers for user routes to interact with user collection
const User = require('../models/userModel')

// GET document by IP
const getUser = async (request, response) => {
    const {ip} = request.params

    try {
        // Retrieve document
        const doc = await User.findOne({_id: ip})

        // Bad response if document does not exist
        if (!doc) {
            return response.status(400).json({error: 'No such user'})
        }

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// POST new user
const createUser = async (request, response) => {
    // Get data from request body
    const {ip} = request.body

    try {
        // Create and return new document
        const doc = await User.create({_id: ip})
        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// PATCH user document by IP 
const updateUser = async (request, response) => {
    const {ip} = request.params

    try {
        // Update document with body of request
        const doc = await User.findOneAndUpdate({_id: ip}, {
            ...request.body
        }, {new: true})

        if (!doc) {
            return response.status(400).json({error: 'No such user'})
        }

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// PATCH user puzzle progress
const updateUserPuzzle = async (request, response) => {
    const {ip, puzzleID} = request.params

    try {
        // Retrieve document
        const doc = await User.findOne({_id: ip})

        // Update document, using puzzle progress from request body
        console.log(request.body)
        doc.puzzles.set(puzzleID, {...request.body})
        await doc.save()

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// DELETE existing user
const deleteUser = async (request, response) => {
    const {ip} = request.params

    try {
        // Delete document
        const doc = await User.findOneAndDelete({_id: ip})

        if (!doc) {
            return response.status(400).json({error: 'No such user'})
        }

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


module.exports = {
    getUser,
    createUser,
    updateUser,
    updateUserPuzzle,
    deleteUser
}