

const createError = require("http-errors");
const  ContactSchema  = require("../../models/contacts");
const { contacts: service } = require("../../services");

// Controller function for adding a new contact.
const addContact = async (req, res) => {
  // Validate the request body against the 'ContactSchema'.
  const { error } = ContactSchema.validate(req.body);

  // If there's an error in the validation result, throw a custom 400 (Bad Request) error.
  if (error) {
    throw createError(400, "Missing required field");
  }

  // If the request body is valid, call the 'addContact' function from the 'service' module to add the new contact.
  const result = await service.addContact(req.body);

  // Respond with a 201 (Created) status code and the added contact data in the response.
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

// Export the 'addContact' function to be used in 'routes/api/contacts.js'.
module.exports = addContact;
