/**
 * Home Route
 * Serves the main landing page
 * 
 * ERROR INJECTION POINTS:
 * 1. Change path to wrong file location
 * 2. Remove the route entirely
 * 3. Throw an error before sending response
 * 4. Send wrong content type
 */

const express = require('express');
const path = require('path');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  // ERROR INJECTION: Uncomment to crash this route
  // throw new Error('Home route crashed!');
  
  // ERROR INJECTION: Change to wrong path to test 404
  const filePath = path.join(__dirname, '../views/home.html');
  
  res.sendFile(filePath);
});

module.exports = router;
