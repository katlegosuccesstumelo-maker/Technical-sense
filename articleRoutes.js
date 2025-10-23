const express = require('express');
const router = express.Router();
const { addArticle, fetchArticles, fetchArticleById, editArticle, removeArticle } = require('../controllers/articleController');

router.post('/', addArticle);           // Add a new article
router.get('/', fetchArticles);         // Get all articles
router.get('/:id', fetchArticleById);   // Get article by ID
router.put('/:id', editArticle);        // Update article
router.delete('/:id', removeArticle);   // Delete article

module.exports = router;