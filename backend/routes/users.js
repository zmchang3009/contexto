// Routes for users
const express = require('express')
const {getUser, createUser, updateUser, updateUserPuzzle, deleteUser} = require('../controllers/userControllers')

const router = express.Router()

// GET user document by IP
router.get('/user/:ip', getUser)

// POST user document
router.post('/user', createUser)

// PATCH user document by IP
router.patch('/user/:ip', updateUser)

// PATCH user puzzle progress
router.patch('/user/:ip/:puzzleID', updateUserPuzzle)

// DELETE user document by IP
router.delete('/user/:ip', deleteUser)


module.exports = router