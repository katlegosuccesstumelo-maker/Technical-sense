const dbPromise = require('../database');

const createArticle = async (title, description, image_url, category) => {
  const db = await dbPromise;
  const res = await db.run(
    'INSERT INTO articles (title, description, image_url, category) VALUES (?, ?, ?, ?)',
    [title, description, image_url, category]
  );
  return { id: res.lastID, title, description, image_url, category };
};

const getArticles = async (category) => {
  const db = await dbPromise;
  if (category) {
    return db.all('SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC', [category]);
  } else {
    return db.all('SELECT * FROM articles ORDER BY created_at DESC');
  }
};

const getArticleById = async (id) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM articles WHERE id = ?', [id]);
};

const updateArticle = async (id, title, description, image_url, category) => {
  const db = await dbPromise;
  await db.run(
    'UPDATE articles SET title=?, description=?, image_url=?, category=? WHERE id=?',
    [title, description, image_url, category, id]
  );
  return getArticleById(id);
};

const deleteArticle = async (id) => {
  const db = await dbPromise;
  const article = await getArticleById(id);
  await db.run('DELETE FROM articles WHERE id=?', [id]);
  return article;
};

module.exports = { createArticle, getArticles, getArticleById, updateArticle, deleteArticle };
