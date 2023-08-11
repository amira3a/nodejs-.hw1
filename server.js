// Import required modules
const mongoose = require("mongoose"); // MongoDB object modeling tool
const app = require('./app'); // Express application

// Destructure environment variables, providing a default value for PORT if not provided
const { DB_HOST, PORT = 3000 } = process.env;

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

