// Schema for dummy collection (Stores words)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dummySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// Create model using aforementioned schema
module.exports = mongoose.model('Dummy', dummySchema)