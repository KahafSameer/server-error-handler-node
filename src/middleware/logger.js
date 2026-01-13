/**
 * Request Logger Middleware
 * Logs HTTP requests with method, URL, status code, and response time
 * 
 * ERROR INJECTION POINTS:
 * 1. Comment out the entire middleware to disable logging
 * 2. Remove res.on('finish') to break timing
 * 3. Change console.log to console.error for wrong log level
 * 4. Throw an error inside the middleware to crash requests
 * 5. Remove next() to hang all requests
 */

const config = require('../config/config');

function logger(req, res, next) {
  // Check if logging is enabled
  if (!config.features.enableLogging) {
    return next();
  }
  
  const startTime = Date.now();
  
  // Capture response finish event
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;
    
    // Color coding based on status
    let statusColor = '\x1b[32m'; // Green for 2xx
    if (status >= 400 && status < 500) {
      statusColor = '\x1b[33m'; // Yellow for 4xx
    } else if (status >= 500) {
      statusColor = '\x1b[31m'; // Red for 5xx
    }
    
    const resetColor = '\x1b[0m';
    
    // Log format: [timestamp] METHOD /path STATUS duration
    console.log(
      `[${timestamp}] ${method} ${url} ${statusColor}${status}${resetColor} ${duration}ms`
    );
  });
  
  // ERROR INJECTION: Uncomment to crash on every request
  // throw new Error('Logger middleware crashed!');
  
  next();
}

module.exports = logger;
