const sqlite3 = require('sqlite3').verbose();
const sqlite3 = require('sqlite3').verbose(); // ✅ missing
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database
});

// Auto-create tables when server starts
(async () => {
  const db = await dbPromise;

  // Users table
  await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Articles table
  await db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('Database and tables are ready!');
})();

module.exports = dbPromise;