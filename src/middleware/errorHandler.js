const config = require('../config/config');

function errorHandler(err, req, res, next) {
  if (!config.features.enableErrorHandler) {
    return res.status(500).send('Error handler is disabled');
  }

  // Log the error (DevOps + monitoring)
  console.error('\x1b[31m[ERROR]\x1b[0m', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const statusCode = err.statusCode || err.status || 500;

  // Determine if request wants JSON (API) or browser HTML
  const wantsJSON = req.headers.accept && req.headers.accept.includes('application/json');

  if (wantsJSON) {
    // API JSON response
    const errorResponse = {
      success: false,
      error: {
        message: err.message || 'Internal Server Error',
        code: err.code || 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      }
    };
    if (config.nodeEnv === 'development') {
      errorResponse.error.stack = err.stack;
    }
    return res.status(statusCode).json(errorResponse);
  } else {
    // Browser friendly HTML response
    let message = 'There is a technical problem. Our team is working on it. Please try again later.';
    if (statusCode === 404) {
      message = 'Page not found. Please check the URL.';
    }

    return res.status(statusCode).send(`
      <html>
        <head>
          <title>Error ${statusCode}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f8f8; }
            h1 { color: #d9534f; }
            p { font-size: 18px; }
          </style>
        </head>
        <body>
          <h1>Error ${statusCode}</h1>
          <p>${message}</p>
        </body>
      </html>
    `);
  }
}

// 404 Not Found handler
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.url}`);
  error.statusCode = 404;
  error.code = 'NOT_FOUND';
  next(error);
}

module.exports = {
  errorHandler,
  notFoundHandler
};
