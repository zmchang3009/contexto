// Routes for puzzles
const express = require('express')
const {getRankByWord, getRankByRank, createRank, updateRankByWord, deleteRankByWord} = require('../controllers/puzzleControllers')

const router = express.Router()

// GET rank document by word
router.get('/puzzle/:word', getRankByWord)

// GET rank document by rank
router.get('/puzzle/rank/:rank', getRankByRank)

// POST rank document
router.post('/puzzle', createRank)

// PATCH rank document by word
router.patch('/puzzle/:word', updateRankByWord)

// DELETE rank document by word
router.delete('/puzzle/:word', deleteRankByWord)


module.exports = router