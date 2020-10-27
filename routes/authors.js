const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// Routes and controllers will have single file
// In views they will have a folder containing views
// those folders will contain views for corresponding route

// Get All authors route
router.get('/', (req, res) => {
    res.render('authors/index')
}) 

// New author route (displaying form)
router.get('/new', (req, res) => {
    // This doesnt actually save anything to db
    // but creates a new author that we can use to save, del, update stuff in db
    // and gives object we can use to use in our ejs file
    res.render('authors/new', { author: new Author() })
})

// Create author route (dont need a view for this cuz not rendering anything)
router.post('/', (req, res) => {
    res.send('Create') // Create something instead of render
})

module.exports = router

