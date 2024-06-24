const express = require('express');
const path = require('path');
const cors = require('cors'); // Import CORS package
const indexRoutes = require('./routes/index'); // Import index routes

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the index routes as middleware
app.use('/api', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
