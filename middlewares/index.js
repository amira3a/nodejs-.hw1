// Import the 'ctrlWrapper' middleware from './ctrlWrapper.js'.
const ctrlWrapper = require("./ctrlWrapper");
const auth = require("./auth")
// Export an object containing the 'ctrlWrapper' middleware.
module.exports = {
  ctrlWrapper,
  auth,
};
