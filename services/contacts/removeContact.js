// Import the 'contactsOperations' from '../../models/contacts'.
const contactsOperations = require("../../models/contacts");

// Service function for remove contact .
const removeContact = async (id) => {
  try {
    // Call the 'removeContact' function from 'contactsOperations' to add the new contact.
    const data = await contactsOperations.removeContact(id);
    
    return data;
  } catch (err) {
    // If an error occurs during the operation, log the error message to the console.
    console.log(err.message);
  }
};

// Export the 'removeContact' service function to be used in 'controllers/contacts/addContact.js'.
module.exports = removeContact;