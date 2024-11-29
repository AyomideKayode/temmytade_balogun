// server.js
const express = require('express');
const path = require('path'); // import path module for file paths
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

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
