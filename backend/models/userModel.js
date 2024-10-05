// Schema for users
const mongoose = require('mongoose')

// Specify database to connect to
const userDB = mongoose.connection.useDb('test')

const Schema = mongoose.Schema

const Word = new Schema({
    _id: false, // Do not generate _id for Word subdocument
    text: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
})

const puzzleSubdoc = new Schema({
    // Overwrite Mongoose default id, use puzzle id (Puzzle collection name) instead
    _id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'incomplete'
    },
    guesses: {
        type: [Word],
        default: []
    }
})

const userSchema = new Schema({
    // Overwrite Mongoose default id with user IP address
    _id: {
        type: Number,
        required: true
    },
    puzzles: {
        type: Map, // Key:Value == puzzleId:puzzleSubdoc
        of: puzzleSubdoc,
        default: {},
        // select: false // Do not return puzzles by default
    }
})

// Create model using above schema
module.exports = userDB.model('User', userSchema, 'temp_users')