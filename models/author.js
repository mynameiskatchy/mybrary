const mongoose = require('mongoose')

// Create a schema (table in SQL db)
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// Pass table name and schema
module.exports = mongoose.model('Author', authorSchema) 
