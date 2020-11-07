const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'] // all image types that we will be accepting
const upload = multer({// configure multer to be used w/ project
    // want to upload to public folder but don't want to hardcode onto server here; store in books model
    dest: uploadPath, 
    // filter files that server accepts
    fileFilter: (req, file, callback) => {
        // null since no error for error parameter, T if file accepted
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})


// All Books Route
router.get('/', async (req, res) => {
    res.send('All Books')
})

// New Book Route
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch {
        res.redirect('/books')
    }
})

// Create Book Route
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
        // cover: create cover img file, get name from that, and then save to file system (multr lib)
    })
})

module.exports = router