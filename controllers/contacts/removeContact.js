// Import required modules: 'http-errors' for creating custom HTTP errors,

// and 'service' from '../services' for interacting with the data model.

const createError = require("http-errors");
const { contacts: service } = require("../../services");

// Controller function for remove contact.
const removeContact = async (req, res) => {
  
  const result = await service.removeContact(req);
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