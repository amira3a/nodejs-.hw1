// Import the 'getAllContacts' and 'addContact' controller functions from their respective files.
const getAllContacts = require("./getAllContacts");
const addContact = require("./addContact");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");

// Export an object containing the imported controller functions.
module.exports = {
  getAllContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
};
