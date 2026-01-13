/**
 * Authentication Routes
 * Handles login and logout (dummy implementation)
 * 
 * ERROR INJECTION POINTS:
 * 1. Remove password validation
 * 2. Always return success even with wrong credentials
 * 3. Crash on login attempt
 * 4. Return wrong status codes
 * 5. Skip session creation
 */

const express = require('express');
const path = require('path');
const router = express.Router();

// Simple in-memory session storage (not for production!)
const sessions = new Map();

// Demo credentials
const DEMO_USER = {
  username: 'admin',
  password: 'password123'
};

// GET /login - Show login page
router.get('/login', (req, res) => {
  const filePath = path.join(__dirname, '../views/login.html');
  res.sendFile(filePath);
});

// POST /login - Handle login
router.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  const { username, password } = req.body;
  
  // ERROR INJECTION: Uncomment to crash on login
  // throw new Error('Login route crashed!');
  
  // Validate credentials
  // ERROR INJECTION: Comment out validation to always succeed
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    // Create simple session (using a cookie in real apps)
    const sessionId = Date.now().toString();
    sessions.set(sessionId, { username, loginTime: new Date() });
    
    // ERROR INJECTION: Comment out session creation to break dashboard access
    // sessions.set(sessionId, { username, loginTime: new Date() });
    
    // In a real app, set a cookie here
    res.cookie = sessionId; // Simplified for demo
    
    // Redirect to dashboard
    res.redirect('/dashboard');
  } else {
    // ERROR INJECTION: Return 200 instead of 401
    res.status(401).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Login Failed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .error-box {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }
          h1 { color: #f5576c; }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="error-box">
          <h1>❌ Login Failed</h1>
          <p>Invalid username or password</p>
          <a href="/login">Try Again</a>
        </div>
      </body>
      </html>
    `);
  }
});

// GET /logout - Handle logout
router.get('/logout', (req, res) => {
  // Clear session (simplified)
  sessions.clear();
  
  res.redirect('/');
});

// Export sessions for use in other routes
router.sessions = sessions;

module.exports = router;
