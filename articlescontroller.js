const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../models/articleModel');

const addArticle = async (req, res) => {
  try {
    const { title, description, image_url, category } = req.body;
    const article = await createArticle(title, description, image_url, category);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchArticles = async (req, res) => {
  try {
    const { category } = req.query;
    const articles = await getArticles(category);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await getArticleById(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, category } = req.body;
    const article = await updateArticle(id, title, description, image_url, category);
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await deleteArticle(id);
    res.json({ message: 'Article deleted', article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addArticle, fetchArticles, fetchArticleById, editArticle, removeArticle };
