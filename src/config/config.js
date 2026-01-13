require("dotenv").config();

/**
 * Centralized Configuration Management
 *
 * ERROR INJECTION POINTS:
 * 1. Change PORT to invalid value (e.g., 'abc', -1, 99999)
 * 2. Set NODE_ENV to invalid value
 * 3. Comment out dotenv.config() to test missing env vars
 * 4. Add required config that doesn't exist in .env
 */

const config = {
  // Server Configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Application Settings
  app: {
    name: process.env.APP_NAME || "DevOps Practice App",
    version: process.env.APP_VERSION || "1.0.0",
  },

  // Feature Flags
  features: {
    enableLogging: process.env.ENABLE_LOGGING !== "false",
    enableErrorHandler: process.env.ENABLE_ERROR_HANDLER !== "false",
  },

  // Request Settings
  request: {
    maxSize: process.env.MAX_REQUEST_SIZE || "1mb",
    timeout: parseInt(process.env.REQUEST_TIMEOUT || "5000", 10),
  },
};

// Validation function (can be disabled for testing)
function validateConfig() {
  const errors = [];

  if (isNaN(config.port) || config.port < 1 || config.port > 65535) {
    errors.push(`Invalid PORT: ${config.port}`);
  }

  if (!["development", "production", "test"].includes(config.nodeEnv)) {
    console.warn(`⚠️  Warning: Unusual NODE_ENV value: ${config.nodeEnv}`);
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join("\n")}`);
  }
}

// Run validation (comment this out to test with invalid config)
validateConfig();

module.exports = config;
