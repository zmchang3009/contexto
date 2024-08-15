// Controllers for embedding routes to interact with embeddings collection
const Embedding = require('../models/embeddingModel')

// GET an embedding by 'word' field
const getEmbeddingByWord = async (request, response) => {
    // Get data
    const {word} = request.params

    try {
        // Retrieve embedding
        const doc = await Embedding.findOne({word: word})

        // Bad response if embedding does not exist
        if (!doc) {
            return response.status(404).json({error: 'No such embedding'})
        }

        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// GET embeddings by 'remark' field


// POST new embedding
const createEmbedding = async (request, response) => {
    // Get data from request body (parsed)
    const {word, embedding, remark} = request.body

    try {
        // Create and return an embedding document
        const doc = await Embedding.create({word, embedding, remark})
        response.status(200).json(doc)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


// PATCH existing embedding by 'word' field
const updateEmbeddingByWord = async (request, response) => {
    const {word} = request.params

    // Update embedding document with body of request
    const doc = await Embedding.findOneAndUpdate({word: word}, {
        ...request.body
    }, {new: true})

    if (!doc) {
        return response.status(400).json({error: 'No such embedding'})
    }

    response.status(200).json(doc)
}


// DELETE embedding by 'word' field
const deleteEmbeddingByWord = async (request, response) => {
    const {word} = request.params

    // Delete embedding document
    const doc = await Embedding.findOneAndDelete({word: word})

    if (!doc) {
        return response.status(400).json({error: 'No such embedding'})
    }

    response.status(200).json(doc)
}


module.exports = {
    getEmbeddingByWord,
    createEmbedding,
    updateEmbeddingByWord,
    deleteEmbeddingByWord
}