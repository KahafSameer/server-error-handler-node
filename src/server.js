/**
 * DevOps Practice Application - Main Server
 * 
 * A beginner-friendly Express.js application designed for practicing:
 * - Error handling and debugging
 * - Log monitoring
 * - Server configuration
 * - Production-like troubleshooting
 * 
 * ERROR INJECTION POINTS:
 * 1. Change port to invalid value
 * 2. Comment out middleware to break functionality
 * 3. Disable error handler
 * 4. Crash the server on startup
 * 5. Remove route registrations
 */

const express = require('express');
const config = require('./config/config');
const logger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const indexRoute = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const apiRoutes = require('./routes/api');

// Create Express app
const app = express();

// ERROR INJECTION: Uncomment to crash on startup
// throw new Error('Server crashed on startup!');

console.log('🚀 Starting DevOps Practice Application...');
console.log(`📋 Environment: ${config.nodeEnv}`);
console.log(`🔧 Configuration loaded`);

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Request logger (must be first)
// ERROR INJECTION: Comment out to disable logging
app.use(logger);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ERROR INJECTION: Uncomment to crash on every request
// app.use((req, res, next) => {
//   throw new Error('Middleware crashed!');
// });

// ============================================
// ROUTES
// ============================================

// Home route
// ERROR INJECTION: Comment out to break home page
app.use('/', indexRoute);

// Auth routes
// ERROR INJECTION: Comment out to break login
app.use('/', authRoutes);

// Dashboard route
// ERROR INJECTION: Comment out to break dashboard
app.use('/', dashboardRoute);

// API routes
// ERROR INJECTION: Comment out to break API
app.use('/', apiRoutes);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler (must be after all routes)
// ERROR INJECTION: Comment out to return default Express 404
app.use(notFoundHandler);

// Central error handler (must be last)
// ERROR INJECTION: Comment out to see default error handling
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

const PORT = config.port;

// ERROR INJECTION: Use invalid port
// const PORT = 'invalid';
// const PORT = -1;
// const PORT = 99999;

const server = app.listen(PORT, () => {
  console.log('');
  console.log('✅ Server started successfully!');
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('📍 Available routes:');
  console.log(`   Home:       http://localhost:${PORT}/`);
  console.log(`   Login:      http://localhost:${PORT}/login`);
  console.log(`   Dashboard:  http://localhost:${PORT}/dashboard`);
  console.log(`   API Data:   http://localhost:${PORT}/api/data`);
  console.log(`   Health:     http://localhost:${PORT}/health`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

// Handle shutdown signals
process.on('SIGTERM', () => {
  console.log('');
  console.log('⚠️  SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('');
  console.log('⚠️  SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

// ERROR INJECTION: Uncomment to crash after 5 seconds
// setTimeout(() => {
//   throw new Error('Server crashed after 5 seconds!');
// }, 5000);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('');
  console.error('💥 UNCAUGHT EXCEPTION:');
  console.error(error);
  console.error('');
  console.error('Server will shut down...');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('');
  console.error('💥 UNHANDLED REJECTION:');
  console.error('Promise:', promise);
  console.error('Reason:', reason);
  console.error('');
});

module.exports = app;
