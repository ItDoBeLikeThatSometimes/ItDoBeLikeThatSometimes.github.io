const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the ProjectItself directory
app.use(express.static("node_modules"));
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


