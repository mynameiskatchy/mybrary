const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// Routes and controllers will have single file
// In views they will have a folder containing views
// those folders will contain views for corresponding route

// Get All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
}) 

// New author route (displaying form)
router.get('/new', async (req, res) => {
    // This doesnt actually save anything to db
    // but creates a new author that we can use to save, del, update stuff in db
    // and gives object we can use to use in our ejs file
    res.render('authors/new', { author: new Author() })
})

// Create author route (dont need a view for this cuz not rendering anything)
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name // Explicity tell server which parms we want to accept from client
    })

    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        // Render new page; pass it back author and error msg
        res.render('authors/new', { 
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

    // author.save((err, newAuthor) => {
    //     if (err) {
    //         // render new page again
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } else {
    //         // dont have this page yet
    //         // res.redirect(`authors/${newAuthor.id}`) // String interpolation
    //         res.redirect(`authors`)

    //     }
    // })
})

module.exports = router

