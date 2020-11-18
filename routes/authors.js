const express = require('express')
const author = require('../models/author')
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
    res.render('authors/new', { author: new Author() })
})

// Create author route (dont need a view for this cuz not rendering anything)
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name // Explicity tell server which parms we want to accept from client
    })

    try {
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        // Render new page; pass it back author and error msg
        res.render('authors/new', { 
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

/* AUTHOR ROUTES */
// Show Author Route
router.get('/:id', (req, res) => {
    res.send('Show Author ' + req.params.id)
})

// Edit Author
router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect('/authors')
    }
    
})

// Update Author Route
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error Updating Author'
            })
        }
    }
})

// Delete Author Route
router.delete('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect('/authors')
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})
module.exports = router

