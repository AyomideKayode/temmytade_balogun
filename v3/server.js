// server.js
const express = require('express');
const path = require('path'); // import path module for file paths
const fs = require('fs'); // import fs module to read files
require('dotenv').config(); // import dotenv module to use environment variables

// define initial path
let initialPath = path.join(__dirname, 'public');

// port
const port = process.env.PORT || 3000;

// create express app
const app = express();
app.use(express.static(initialPath));

// define route
app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, 'index.html'));
});

app.get('/images/:category', (req, res) => {
  const category = req.params.category;
  const categoryPath = path.join(initialPath, 'images', category);

  fs.readdir(categoryPath, (err, files) => {
    if (err) return res.status(404).send('Category not found');

    // const images = files.map((file) => `/images/${category}/${file}`);
    res.json(files);
  });
});

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

module.exports = app; // export app for testing
