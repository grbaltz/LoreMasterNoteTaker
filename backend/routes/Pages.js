const express = require('express');
const {
    getPage,
    getPages,
    getNew,
    createPage,
    deletePage,
    updatePage,
} = require('../controllers/pageController');
const router = express.Router();

// GET a page
router.get('/:id', getPage);

// GET all pages
router.get('/', getPages);

// CREATE a page
router.post('/', createPage);

// DELETE a page
router.delete('/:id', deletePage);

// PATCH a page
router.patch('/:id', updatePage);

module.exports = router