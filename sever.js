const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');             // if your file is auth.js
const articleRoutes = require('./routes/articleRoutes'); // must match the file name exactly

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Technical Senses API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));