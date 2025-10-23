const express = require('express');
const router = express.Router();
const { 
  addArticle, 
  fetchArticles, 
  fetchArticleById, 
  editArticle, 
  removeArticle 
} = require('../controllers/articlesController');

// Create a new article
router.post('/', addArticle);

// Get all articles (optionally filter by category, e.g., ?category=AI)
router.get('/', fetchArticles);

// Get a single article by ID
router.get('/:id', fetchArticleById);

// Update an article by ID
router.put('/:id', editArticle);

// Delete an article by ID
router.delete('/:id', removeArticle);

module.exports = router;