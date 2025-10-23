const dbPromise = require('../db');

const createUser = async (username, email, password) => {
  const db = await dbPromise;
  const res = await db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return { id: res.lastID, username, email, password };
};

const findUserByEmail = async (email) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
};

module.exports = { createUser, findUserByEmail };
✅ Notes:
? placeholders are used in SQLite instead of $1, $2.

db.run → for INSERT/UPDATE/DELETE

db.get → for a single row (SELECT)

db.all → for multiple rows (SELECT *)

After updating this, your auth controller and signup/login routes will work with SQLite correctly.

I can also rewrite your authController.js and routes/auth.js for SQLite so your login/signup works immediately.

Do you want me to do that?












