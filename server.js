// Import required modules
const mongoose = require("mongoose"); // MongoDB object modeling tool
const app = require('./app'); // Express application

// Destructure environment variables, providing a default value for PORT if not provided
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
     })   
      .catch((error) => {
      console.log(error.message);
      process.exit(1);
    
  });
