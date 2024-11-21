const express = require('express')
const cors = require('cors'); // Import CORS
const websiteRoutes = require('./routes/websiteRoutes.js'); // Ensure the path is correct

const app = express()
const port = process.env.PORT || 3000; // Server port thats being used

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' })); // JSON format and size
app.use(cors());
// Use website routes
app.use(websiteRoutes);