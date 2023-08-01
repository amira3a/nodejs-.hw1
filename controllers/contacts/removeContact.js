// Import required modules: 'http-errors' for creating custom HTTP errors,
// 'contactSchema' from '../schemas' for data validation,
// and 'service' from '../services' for interacting with the data model.

const createError = require("http-errors");
const { contactSchema } = require("../../schemas");
const { contacts: service } = require("../../services");

// Controller function for remove contact.
const removeContact = async (req, res) => {
  // Validate the request body against the 'contactSchema'.
  const { error } = contactSchema.validate(req.body);

  // If there's an error in the validation result, throw a custom 400 (Bad Request) error.
  if (error) {
    throw createError(400, "Missing required field");
  }

  // If the request body is valid, call the 'removeContact' function from the 'service' module to add the new contact.
  const result = await service.removeContact(req.body);

  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

// Export the 'removeContact' function to be used in 'routes/api/contacts.js'.
module.exports = removeContact;