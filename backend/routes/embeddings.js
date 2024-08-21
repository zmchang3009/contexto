// Routes for embeddings
const express = require('express')
const { getEmbeddingByWord, createEmbedding, updateEmbeddingByWord, deleteEmbeddingByWord } = require('../controllers/embeddingControllers')

const router = express.Router()

// GET one embedding document by word
router.get('/embedding/:word', getEmbeddingByWord)

// GET all embedding documents by remark

// POST an embedding document
router.post('/embedding', createEmbedding)

// PATCH an embedding document by word
router.patch('/embedding/:word', updateEmbeddingByWord)

// DELETE an embedding document by word
router.delete('/embedding/:word', deleteEmbeddingByWord)


module.exports = router