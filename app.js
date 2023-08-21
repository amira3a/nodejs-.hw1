// Import required modules: Express, Morgan (for logging), and CORS (Cross-Origin Resource Sharing).
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();
// Import the 'contactsRouter' module from './routes/api/contacts' to handle contact-related API routes.
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users")
// Create an instance of the Express application.
const app = express();

// Determine the logging format based on the application environment (development or production).
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const sess = {
  secret: process.env.JWT_SECRET, // Secret key for session management
  cookie: {
    maxAge: 600000, // Maximum age of the session cookie in milliseconds
    httpOnly: true, // Cookie accessible only via HTTP
    secure: false, // Not restricted to HTTPS (set to true in production)
    sameSite: "strict", // Restrict cookie sharing to same-site requests
  },
  resave: false, // Do not save session if not modified
  saveUninitialized: true, // Save uninitialized sessions
};
// Middleware setup: Morgan for logging HTTP requests, CORS for Cross-Origin Resource Sharing, and Express JSON parsing.
app.use(session(sess)); // Use session middleware for managing sessions
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Mount the 'contactsRouter' for all requests starting with '/api/contacts'.
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
// Middleware for handling routes that are not found (404 Not Found).
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Global error handling middleware. If an error occurs in any of the previous middleware or routes,
// this middleware will handle it and return an appropriate error response.
app.use((err, req, res, next) => {
  // Extract status and message properties from the error object, or use default values if not available.
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// Export the Express application instance to be used in 'server.js'.
module.exports = app;
