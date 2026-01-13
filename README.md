# DevOps Practice Application

A beginner-friendly Node.js/Express web application designed for practicing DevOps skills including debugging, monitoring, error handling, and troubleshooting in a production-like environment.

## 🎯 Purpose

This application is intentionally designed to:

- Allow manual introduction of server, application, and configuration errors
- Observe browser outputs, logs, and monitoring behavior
- Practice debugging and fixing issues like a real production environment
- Learn DevOps best practices in a safe, controlled setting

## ✨ Features

- **Express Server** running on port 3000
- **Home Page** with links to all features
- **Authentication Routes** (dummy login, no real auth)
  - `/login` - Login page
  - `/logout` - Logout functionality
- **Protected Dashboard** - Route with basic protection logic
- **API Endpoints**
  - `/api/data` - Returns sample JSON data
  - `/health` - Health check endpoint (returns HTTP 200 + status)
- **Request Logger Middleware** - Logs method, URL, status, and response time
- **Central Error Handler** - Structured error responses with proper HTTP status codes
- **Environment Variable Support** - Using `.env` file
- **Configuration Management** - Centralized config with validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd error-handler
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   copy .env.example .env
   ```

   Or on Linux/Mac:

   ```bash
   cp .env.example .env
   ```

## ▶️ Running the Application

### Development Mode (with auto-restart):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

The server will start on `http://localhost:3000`

## 🌐 Available Routes

| Route        | Method | Description                          |
| ------------ | ------ | ------------------------------------ |
| `/`          | GET    | Home page with navigation            |
| `/login`     | GET    | Login page                           |
| `/login`     | POST   | Handle login (demo credentials)      |
| `/logout`    | GET    | Logout and redirect to home          |
| `/dashboard` | GET    | Protected dashboard (requires login) |
| `/api/data`  | GET    | Returns sample JSON data             |
| `/api/data`  | POST   | Create data (example POST endpoint)  |
| `/health`    | GET    | Health check endpoint                |

## 🔐 Demo Credentials

- **Username:** `admin`
- **Password:** `password123`

## 📁 Project Structure

```
error-handler/
├── src/
│   ├── server.js              # Main Express application
│   ├── config/
│   │   └── config.js          # Configuration management
│   ├── middleware/
│   │   ├── logger.js          # Request logging middleware
│   │   └── errorHandler.js    # Error handling middleware
│   ├── routes/
│   │   ├── index.js           # Home route
│   │   ├── auth.js            # Authentication routes
│   │   ├── dashboard.js       # Dashboard route
│   │   └── api.js             # API endpoints
│   └── views/
│       ├── home.html          # Home page
│       ├── login.html         # Login page
│       └── dashboard.html     # Dashboard page
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── ERROR_INJECTION_GUIDE.md   # Guide for introducing errors
```

## 🔧 Component Explanations

### Server (`src/server.js`)

The main Express application that:

- Loads configuration
- Registers middleware (logger, body parsers, error handler)
- Registers all routes
- Handles graceful shutdown
- Includes error injection points for practice

### Configuration (`src/config/config.js`)

Centralized configuration management:

- Loads environment variables from `.env`
- Validates configuration values
- Provides feature flags for testing
- Can be intentionally misconfigured for practice

### Logger Middleware (`src/middleware/logger.js`)

Logs all HTTP requests with:

- Timestamp
- HTTP method
- Request URL
- Status code (color-coded)
- Response time in milliseconds

### Error Handler (`src/middleware/errorHandler.js`)

Central error handling that:

- Catches all errors
- Returns structured JSON responses
- Uses proper HTTP status codes
- Includes stack traces in development only
- Provides 404 handler for unknown routes

### Routes

- **Home** (`src/routes/index.js`) - Serves the landing page
- **Auth** (`src/routes/auth.js`) - Handles login/logout with dummy authentication
- **Dashboard** (`src/routes/dashboard.js`) - Protected route with basic auth check
- **API** (`src/routes/api.js`) - JSON endpoints for data and health checks

## 🧪 Testing the Application

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Test the home page:**

   - Open browser: `http://localhost:3000`

3. **Test login:**

   - Navigate to `/login`
   - Use credentials: `admin` / `password123`

4. **Test protected route:**

   - Try accessing `/dashboard` directly (should redirect to login)
   - Login first, then access dashboard

5. **Test API endpoints:**

   ```bash
   # Health check
   curl http://localhost:3000/health

   # Get data
   curl http://localhost:3000/api/data

   # Post data
   curl -X POST http://localhost:3000/api/data -H "Content-Type: application/json" -d "{\"name\":\"test\",\"value\":\"123\"}"
   ```

6. **Test 404 handling:**
   - Visit any non-existent route: `http://localhost:3000/nonexistent`

## 🐛 Introducing Errors for Practice

See [`ERROR_INJECTION_GUIDE.md`](ERROR_INJECTION_GUIDE.md) for detailed instructions on how to intentionally break the application for DevOps practice.

## 📊 Monitoring & Logs

The application logs all requests to the console with color coding:

- 🟢 **Green** - 2xx Success
- 🟡 **Yellow** - 4xx Client errors
- 🔴 **Red** - 5xx Server errors

Example log output:

```
[2026-01-13T10:23:45.123Z] GET / 200 15ms
[2026-01-13T10:23:50.456Z] POST /login 302 8ms
[2026-01-13T10:24:00.789Z] GET /api/data 200 3ms
```

## 🛑 Stopping the Server

Press `Ctrl+C` in the terminal to gracefully shut down the server.

## 📝 Notes

- This is a **practice application** - not for production use
- No real authentication or database
- Session management is simplified
- Designed for learning DevOps concepts

## 🎓 Learning Objectives

By using this application, you can practice:

- Reading and analyzing server logs
- Debugging application errors
- Understanding HTTP status codes
- Testing API endpoints
- Monitoring application health
- Handling configuration issues
- Troubleshooting routing problems
- Error handling best practices

## 📄 License

ISC

---

**Happy DevOps Learning! 🚀**
