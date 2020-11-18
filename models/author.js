const mongoose = require('mongoose')
const Book = require('./book')

// Create a schema (table in SQL db)
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// Make constraint to not delete book associated with author
authorSchema.pre('remove', function (next) {
    Book.find({ author: this.id }, (err, books) => {
        if(err) {
          next(err)  
        } else if (books.length > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})

// Pass table name and schema
module.exports = mongoose.model('Author', authorSchema) 
