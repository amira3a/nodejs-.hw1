// Import required modules
const mongoose = require("mongoose"); // MongoDB object modeling tool
const app = require('./app'); // Express application
const express = require('express');
const session = require('express-session');
// Destructure environment variables, providing a default value for PORT if not provided
const { DB_HOST, PORT = 3000 } = process.env;


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
app.use(session(sess));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to MongoDB using the provided DB_HOST
mongoose.connect(DB_HOST)
  .then(() => {
    // If the connection is successful, start the Express app to listen on the specified PORT
    app.listen(PORT, () => {
      console.log("Database connection successful"); // Log success message to the console
    });
  })
  .catch(error => {
    // If an error occurs during the connection, handle the error here
    console.log(error.message); // Log the error message to the console
    process.exit(1); // Exit the Node.js process with an error code (1) to indicate failure
  });

