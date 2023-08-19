// Import required modules
const mongoose = require("mongoose"); // MongoDB object modeling tool
const app = require('./app'); // Express application
const express = require('express');
const session = require('express-session');
// Destructure environment variables, providing a default value for PORT if not provided
const { DB_HOST, PORT = 3000, JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  console.error("JWT_SECRET not defined in environment variables.");
  process.exit(1);
}

if (!DB_HOST) {
  console.error("DB_HOST not defined in environment variables.");
  process.exit(1);
}

const sess = {
  secret: process.env.JWT_SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};


const startServer = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");

    app.use(session(sess));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

startServer();
