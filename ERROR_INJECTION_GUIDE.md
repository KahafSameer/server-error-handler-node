# Error Injection Guide

This guide explains how to intentionally introduce errors into the DevOps Practice Application for learning and testing purposes.

## 🎯 Purpose

This application is designed with **intentional error injection points** throughout the codebase. Each file contains commented sections showing where and how to introduce specific types of errors.

## 📚 Table of Contents

1. [Configuration Errors](#configuration-errors)
2. [Server Errors](#server-errors)
3. [Middleware Errors](#middleware-errors)
4. [Route Errors](#route-errors)
5. [API Errors](#api-errors)
6. [Common Error Scenarios](#common-error-scenarios)

---

## Configuration Errors

### File: `src/config/config.js`

#### ❌ Invalid Port Number

**What to do:** Change the PORT value to something invalid

```javascript
port: 'abc',        // String instead of number
port: -1,           // Negative number
port: 99999,        // Out of valid range (1-65535)
```

**Expected behavior:**

- Configuration validation will throw an error
- Server won't start
- Error message: "Invalid PORT: [value]"

**How to fix:**

- Set PORT back to a valid number (1-65535)
- Or set in `.env` file: `PORT=3000`

---

#### ❌ Missing Environment Variables

**What to do:** Comment out the dotenv config line

```javascript
// require('dotenv').config();
```

**Expected behavior:**

- All environment variables will be undefined
- App will use default values
- May cause unexpected behavior

**How to fix:**

- Uncomment `require('dotenv').config();`
- Ensure `.env` file exists

---

#### ❌ Invalid Configuration

**What to do:** Comment out the validation function call

```javascript
// validateConfig();
```

**Expected behavior:**

- Invalid configuration values won't be caught
- Server may start with wrong settings
- Runtime errors may occur

**How to fix:**

- Uncomment `validateConfig();`

---

## Server Errors

### File: `src/server.js`

#### ❌ Server Crash on Startup

**What to do:** Uncomment the startup crash

```javascript
throw new Error("Server crashed on startup!");
```

**Expected behavior:**

- Server immediately crashes
- Process exits with error
- No routes are available

**How to fix:**

- Comment out or remove the throw statement

---

#### ❌ Delayed Server Crash

**What to do:** Uncomment the timeout crash

```javascript
setTimeout(() => {
  throw new Error("Server crashed after 5 seconds!");
}, 5000);
```

**Expected behavior:**

- Server starts normally
- Crashes after 5 seconds
- All connections are lost

**How to fix:**

- Comment out the setTimeout block

---

#### ❌ Disabled Middleware

**What to do:** Comment out middleware registration

```javascript
// app.use(logger);              // Disables logging
// app.use(errorHandler);        // Disables error handling
```

**Expected behavior:**

- No request logs appear
- Errors show default Express error page
- Harder to debug issues

**How to fix:**

- Uncomment the middleware

---

#### ❌ Disabled Routes

**What to do:** Comment out route registration

```javascript
// app.use('/', indexRoute);     // Breaks home page
// app.use('/', authRoutes);     // Breaks login
// app.use('/', apiRoutes);      // Breaks API
```

**Expected behavior:**

- 404 errors for those routes
- Features become unavailable

**How to fix:**

- Uncomment the route registration

---

## Middleware Errors

### File: `src/middleware/logger.js`

#### ❌ Disabled Logging

**What to do:** Set ENABLE_LOGGING to false in `.env`

```env
ENABLE_LOGGING=false
```

**Expected behavior:**

- No request logs appear in console
- Harder to monitor traffic

**How to fix:**

- Set `ENABLE_LOGGING=true` or remove the line

---

#### ❌ Logger Crash

**What to do:** Uncomment the error throw

```javascript
throw new Error("Logger middleware crashed!");
```

**Expected behavior:**

- Every request crashes
- Error handler catches it
- 500 errors for all routes

**How to fix:**

- Comment out the throw statement

---

#### ❌ Hanging Requests

**What to do:** Remove the `next()` call

```javascript
// next();
```

**Expected behavior:**

- All requests hang indefinitely
- Browser shows loading forever
- No response is sent

**How to fix:**

- Add back `next();`

---

### File: `src/middleware/errorHandler.js`

#### ❌ Wrong Status Codes

**What to do:** Uncomment the wrong status code

```javascript
const statusCode = 200; // Always returns 200
```

**Expected behavior:**

- Errors return 200 OK
- Clients think request succeeded
- Very confusing for debugging

**How to fix:**

- Use proper status code from error object

---

#### ❌ Leaked Stack Traces

**What to do:** Uncomment the stack trace leak

```javascript
errorResponse.error.stack = err.stack;
```

**Expected behavior:**

- Stack traces visible in production
- Security issue - exposes code structure
- Helps attackers understand your code

**How to fix:**

- Only include stack traces in development

---

#### ❌ Malformed JSON Response

**What to do:** Uncomment the malformed response

```javascript
return res.status(statusCode).send("This is not JSON");
```

**Expected behavior:**

- Response is plain text, not JSON
- Breaks API clients expecting JSON
- Content-Type mismatch

**How to fix:**

- Return proper JSON with `res.json()`

---

#### ❌ Disabled Error Handler

**What to do:** Set ENABLE_ERROR_HANDLER to false in `.env`

```env
ENABLE_ERROR_HANDLER=false
```

**Expected behavior:**

- Generic error messages
- Less helpful debugging info

**How to fix:**

- Set `ENABLE_ERROR_HANDLER=true`

---

## Route Errors

### File: `src/routes/index.js`

#### ❌ Wrong File Path

**What to do:** Change the file path

```javascript
const filePath = path.join(__dirname, "../views/wrong.html");
```

**Expected behavior:**

- 404 error - file not found
- Error handler catches it
- Returns error response

**How to fix:**

- Use correct path: `../views/home.html`

---

### File: `src/routes/auth.js`

#### ❌ Broken Authentication

**What to do:** Comment out credential validation

```javascript
// if (username === DEMO_USER.username && password === DEMO_USER.password) {
```

**Expected behavior:**

- Login always fails
- Can't access dashboard
- All credentials rejected

**How to fix:**

- Uncomment the validation

---

#### ❌ Always Succeed Login

**What to do:** Remove the else block

```javascript
// Remove the entire else block
```

**Expected behavior:**

- Any credentials work
- Security issue
- Everyone can access dashboard

**How to fix:**

- Add back credential checking

---

#### ❌ Wrong Status Code

**What to do:** Change 401 to 200

```javascript
res.status(200).send(/* error message */);
```

**Expected behavior:**

- Failed login returns 200 OK
- Confusing for clients
- Incorrect HTTP semantics

**How to fix:**

- Use `res.status(401)` for unauthorized

---

### File: `src/routes/dashboard.js`

#### ❌ Disabled Protection

**What to do:** Comment out auth check

```javascript
// const hasSession = req.headers.referer && req.headers.referer.includes('login');
```

**Expected behavior:**

- Dashboard accessible without login
- Security issue
- Protection bypassed

**How to fix:**

- Uncomment the auth check

---

#### ❌ Wrong Redirect

**What to do:** Change redirect path

```javascript
return res.redirect("/wrong-path");
```

**Expected behavior:**

- Redirects to non-existent page
- 404 error
- User gets stuck

**How to fix:**

- Redirect to `/login`

---

## API Errors

### File: `src/routes/api.js`

#### ❌ Artificial Delay

**What to do:** Uncomment the timeout

```javascript
setTimeout(() => {}, 10000); // 10 second delay
```

**Expected behavior:**

- API takes 10 seconds to respond
- Simulates slow network/database
- May cause timeouts

**How to fix:**

- Remove or reduce the timeout

---

#### ❌ Malformed JSON

**What to do:** Uncomment the wrong response

```javascript
return res.send("This is not JSON");
```

**Expected behavior:**

- Response is plain text
- JSON.parse() fails on client
- API contract broken

**How to fix:**

- Use `res.json()` for JSON responses

---

#### ❌ Wrong Status Code

**What to do:** Return 500 for successful request

```javascript
return res.status(500).json(data);
```

**Expected behavior:**

- Success looks like error
- Clients may retry unnecessarily
- Confusing logs

**How to fix:**

- Use correct status codes (200, 201, etc.)

---

#### ❌ Failed Health Check

**What to do:** Uncomment the failure

```javascript
return res.status(503).json({ status: "unhealthy" });
```

**Expected behavior:**

- Health check always fails
- Monitoring alerts trigger
- Load balancers may remove server

**How to fix:**

- Return 200 with healthy status

---

#### ❌ Missing Validation

**What to do:** Comment out input validation

```javascript
// if (!name || !value) {
//   return res.status(400).json({ ... });
// }
```

**Expected behavior:**

- Accepts invalid data
- May cause crashes later
- Data integrity issues

**How to fix:**

- Validate all inputs

---

## Common Error Scenarios

### Scenario 1: Port Already in Use

**How to create:**

1. Start the server: `npm start`
2. Try to start it again in another terminal

**Expected behavior:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**How to fix:**

- Stop the first instance
- Or change PORT in `.env`

---

### Scenario 2: Missing Dependencies

**How to create:**

```bash
rm -rf node_modules
```

**Expected behavior:**

```
Error: Cannot find module 'express'
```

**How to fix:**

```bash
npm install
```

---

### Scenario 3: Missing .env File

**How to create:**

```bash
rm .env
```

**Expected behavior:**

- Uses default values
- May work but with defaults

**How to fix:**

```bash
cp .env.example .env
```

---

### Scenario 4: Syntax Error

**How to create:**
Add a syntax error anywhere:

```javascript
const x = ;  // Missing value
```

**Expected behavior:**

```
SyntaxError: Unexpected token ';'
```

**How to fix:**

- Fix the syntax error
- Use a linter/formatter

---

### Scenario 5: Infinite Loop

**How to create:**

```javascript
while (true) {
  // Do nothing
}
```

**Expected behavior:**

- Server hangs
- High CPU usage
- No responses

**How to fix:**

- Kill the process (Ctrl+C)
- Remove the infinite loop

---

## 🎓 Learning Tips

1. **One Error at a Time** - Introduce one error, observe, fix, repeat
2. **Read the Logs** - Always check console output for clues
3. **Use Browser DevTools** - Check Network tab for status codes
4. **Test with curl** - Command line testing helps understand responses
5. **Document Your Findings** - Keep notes on what you learned

## 🔍 Debugging Checklist

When something breaks:

- [ ] Check the console logs
- [ ] Verify the error message
- [ ] Check HTTP status code
- [ ] Review recent code changes
- [ ] Check configuration files
- [ ] Verify environment variables
- [ ] Test with curl or Postman
- [ ] Check if server is running
- [ ] Verify port is correct
- [ ] Check file paths

---

## 🚀 Advanced Scenarios

### Simulate Database Timeout

```javascript
router.get("/api/data", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 30000)); // 30s delay
  res.json(data);
});
```

### Simulate Memory Leak

```javascript
const leakyArray = [];
setInterval(() => {
  leakyArray.push(new Array(1000000));
}, 1000);
```

### Simulate Random Failures

```javascript
router.get("/api/data", (req, res) => {
  if (Math.random() < 0.5) {
    throw new Error("Random failure!");
  }
  res.json(data);
});
```

---

**Remember:** This is a safe environment to break things and learn! 🎓
