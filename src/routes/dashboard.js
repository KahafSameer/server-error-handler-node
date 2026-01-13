/**
 * Dashboard Route
 * Protected route that requires authentication
 * 
 * ERROR INJECTION POINTS:
 * 1. Remove authentication check
 * 2. Always redirect to login
 * 3. Return wrong status code
 * 4. Crash when accessed
 */

const express = require('express');
const path = require('path');
const router = express.Router();

// Simple authentication middleware
function requireAuth(req, res, next) {
  // In a real app, check session cookie
  // For demo, we'll do a simplified check
  
  // ERROR INJECTION: Comment out this check to disable protection
  const hasSession = req.headers.referer && req.headers.referer.includes('login');
  
  if (!hasSession && req.method === 'GET') {
    // Not authenticated, redirect to login
    // ERROR INJECTION: Change to wrong redirect path
    return res.redirect('/login');
  }
  
  // ERROR INJECTION: Uncomment to crash the auth middleware
  // throw new Error('Auth middleware crashed!');
  
  next();
}

// Dashboard page (protected)
router.get('/dashboard', requireAuth, (req, res) => {
  // ERROR INJECTION: Uncomment to crash dashboard
  // throw new Error('Dashboard route crashed!');
  
  const filePath = path.join(__dirname, '../views/dashboard.html');
  res.sendFile(filePath);
});

module.exports = router;
