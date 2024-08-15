// Schema for words (in main word bank)
const mongoose = require('mongoose')

// Specify database to connect to
const embeddingDB = mongoose.connection.useDb('test')

const Schema = mongoose.Schema

const embeddingSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    embedding: {
        type: Array,
        required: true
    },
    remark: {
        type: String,
        required: true
    }
})

// Create model using above schema
// TODO: Change model name
module.exports = embeddingDB.model('Embedding', embeddingSchema, 'temp_embeddings')