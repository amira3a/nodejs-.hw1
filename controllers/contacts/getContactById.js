// Import required modules: 'http-errors' for creating custom HTTP errors,

// and 'service' from '../services' for interacting with the data model.

const createError = require("http-errors");
const { contacts: service } = require("../../services");

// Controller function for get contact by id.
const getContactById = async (req, res) => {
  const { _id } = req.params;

  // If the request body is valid, call the 'getContactById' function from the 'service' module to add the new contact.
  const result = await service.getContactById(_id);
  
  if (!result) {
    throw createError(404, `Not found`);
  }
  
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

// Export the 'getContactById' function to be used in 'routes/api/contacts.js'.
module.exports = getContactById;
