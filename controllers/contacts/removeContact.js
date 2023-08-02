// Import required modules: 'http-errors' for creating custom HTTP errors,
// 'contactSchema' from '../schemas' for data validation,
// and 'service' from '../services' for interacting with the data model.

const createError = require("http-errors");
const { contactSchema } = require("../../schemas");
const { contacts: service } = require("../../services");

// Controller function for remove contact.
const removeContact = async (req, res) => {
  // Validate the request body against the 'contactSchema'.
  

  // If there's an error in the validation result, throw a custom 400 (Bad Request) error.
  

  // If the request body is valid, call the 'removeContact' function from the 'service' module to add the new contact.
  const result = await service.removeContact(req.body);
  if (!result) {
    throw createError(404, "not found");
  }
  
  res.json({
    status: "success",
    code: 200,
     message: "contact deleted",
    data: {
      result,
    },
  });
};

// Export the 'removeContact' function to be used in 'routes/api/contacts.js'.
module.exports = removeContact;