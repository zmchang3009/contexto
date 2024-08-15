// Controllers for puzzle routes to interact with puzzle collection
const Puzzle = require('../models/puzzleModel')

// GET document by word
const getRankByWord = async (request, response) => {
    const {word} = request.params

    try {
        // Retrieve document
        const doc = await Puzzle.findOne({text: word})

        // Bad response if document does not exist
        if (!doc) {
            return response.status(400).json({error: 'No such word'})
        }

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// GET document by rank
const getRankByRank = async (request, response) => {
    // Convert input str to num
    const {rank} = request.params
    const rankNum = parseInt(rank)

    // Check validity of rank
    if (typeof rankNum !== 'number') {
        return response.status(400).json({error: 'Invalid rank'})
    }

    try {
        // Retrieve document
        const doc = await Puzzle.findOne({rank: rank})

        // Bad response if document does not exist
        if (!doc) {
            return response.status(400).json({error: 'No such word'})
        }

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// POST new document
const createRank = async (request, response) => {
    // Get data from request body
    const {text, rank} = request.body

    try {
        // Create a return new document
        const doc = await Puzzle.create({text, rank})
        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// PATCH existing document by word
const updateRankByWord = async (request, response) => {
    const {word} = request.params

    // Update document with body of request
    const doc = await Puzzle.findOneAndUpdate({text: word}, {
        ...request.body
    }, {new: true})

    if (!doc) {
        return response.status(400).json({error: 'No such word'})
    }

    response.status(200).json(doc)
}


// DELETE existing document by text field
const deleteRankByWord = async (request, response) => {
    const {word} = request.params

    // Delete document
    const doc = await Puzzle.findOneAndDelete({text: word})

    if (!doc) {
        return response.status(400).json({error: 'No such word'})
    }

    response.status(200).json(doc)
}


module.exports = {
    getRankByWord,
    getRankByRank,
    createRank,
    updateRankByWord,
    deleteRankByWord
}