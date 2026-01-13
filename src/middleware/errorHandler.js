/**
 * Central Error Handling Middleware
 * Catches all errors and returns structured responses
 * 
 * ERROR INJECTION POINTS:
 * 1. Always return 200 instead of proper status codes
 * 2. Expose stack traces in production (security issue)
 * 3. Return malformed JSON
 * 4. Remove error logging
 * 5. Throw another error inside the handler (infinite loop)
 */

const config = require('../config/config');

function errorHandler(err, req, res, next) {
  // Check if error handler is enabled
  if (!config.features.enableErrorHandler) {
    // If disabled, just send a generic error
    return res.status(500).send('Error handler is disabled');
  }
  
  // Log the error
  console.error('\x1b[31m[ERROR]\x1b[0m', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Determine status code
  const statusCode = err.statusCode || err.status || 500;
  
  // ERROR INJECTION: Uncomment to always return 200 (wrong status)
  // const statusCode = 200;
  
  // Prepare error response
  const errorResponse = {
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    }
  };
  
  // Include stack trace in development (not in production)
  // ERROR INJECTION: Change to always include stack (security issue)
  if (config.nodeEnv === 'development') {
    errorResponse.error.stack = err.stack;
  }
  
  // ERROR INJECTION: Uncomment to leak stack traces in production
  // errorResponse.error.stack = err.stack;
  
  // ERROR INJECTION: Uncomment to return malformed JSON
  // return res.status(statusCode).send('This is not JSON');
  
  // Send error response
  res.status(statusCode).json(errorResponse);
  
  // ERROR INJECTION: Uncomment to crash the error handler itself
  // throw new Error('Error handler crashed!');
}

// 404 Not Found handler
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.url}`);
  error.statusCode = 404;
  error.code = 'NOT_FOUND';
  
  // ERROR INJECTION: Uncomment to return 200 for 404s
  // return res.status(200).json({ message: 'Everything is fine!' });
  
  next(error);
}

module.exports = {
  errorHandler,
  notFoundHandler
};
