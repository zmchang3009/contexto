// Schema for words (in main word bank)
const mongoose = require('mongoose')

// Specify database to connect to
const puzzleDB = mongoose.connection.useDb('puzzles')

const Schema = mongoose.Schema

const puzzleSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
})

// Create model using above schema
// TODO: Change collection name. Make it dynamic
module.exports = puzzleDB.model('Puzzle', puzzleSchema, 'temp_puzzle_31-07-2024')