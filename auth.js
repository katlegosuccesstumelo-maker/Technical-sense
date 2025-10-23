nst dbPromise = require('../database');
const bcrypt = require('bcrypt'); // optional, for password hashing

// Create a new user
const createUser = async (username, email, password) => {
  const db = await dbPromise;

  // Hash the password before saving (recommended)
  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );

  return { id: res.lastID, username, email };
};

// Find user by email
const findUserByEmail = async (email) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
};

module.exports = { createUser, findUserByEmail };
