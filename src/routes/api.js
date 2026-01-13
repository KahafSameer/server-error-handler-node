/**
 * API Routes
 * Provides JSON endpoints for data and health checks
 * 
 * ERROR INJECTION POINTS:
 * 1. Return malformed JSON
 * 2. Add artificial delays/timeouts
 * 3. Return wrong status codes
 * 4. Crash the endpoint
 * 5. Return HTML instead of JSON
 */

const express = require('express');
const router = express.Router();

// GET /api/data - Sample data endpoint
router.get('/api/data', (req, res) => {
  // ERROR INJECTION: Uncomment to add artificial delay
  // setTimeout(() => {}, 10000); // 10 second delay
  
  // ERROR INJECTION: Uncomment to crash
  // throw new Error('API data endpoint crashed!');
  
  // Sample data
  const data = {
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      users: [
        { id: 1, name: 'Alice', role: 'Admin' },
        { id: 2, name: 'Bob', role: 'User' },
        { id: 3, name: 'Charlie', role: 'User' }
      ],
      stats: {
        totalUsers: 3,
        activeUsers: 2,
        serverUptime: process.uptime()
      }
    }
  };
  
  // ERROR INJECTION: Uncomment to return malformed JSON
  // return res.send('This is not JSON');
  
  // ERROR INJECTION: Uncomment to return wrong status
  // return res.status(500).json(data);
  
  res.json(data);
});

// GET /health - Health check endpoint
router.get('/health', (req, res) => {
  // ERROR INJECTION: Uncomment to fail health check
  // return res.status(503).json({ status: 'unhealthy' });
  
  // ERROR INJECTION: Uncomment to crash
  // throw new Error('Health check crashed!');
  
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    },
    environment: process.env.NODE_ENV || 'development'
  };
  
  // ERROR INJECTION: Return 500 instead of 200
  res.status(200).json(healthData);
});

// POST /api/data - Example POST endpoint
router.post('/api/data', express.json(), (req, res) => {
  // ERROR INJECTION: Don't validate input
  const { name, value } = req.body;
  
  if (!name || !value) {
    // ERROR INJECTION: Return 200 instead of 400
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name and value'
    });
  }
  
  res.status(201).json({
    success: true,
    message: 'Data created successfully',
    data: { name, value, id: Date.now() }
  });
});

module.exports = router;
