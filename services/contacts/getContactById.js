// Import the 'contactsOperations' from '../../models/contacts'.
const contactsOperations = require("../../controllers/contacts");

// Service function for get contact by id.
const getContactById = async (body) => {
  try {
    // Call the 'getContactById' function from 'contactsOperations' to add the new contact.
    const data = await contactsOperations.getContactById(body);
    
    return data;
  } catch (err) {
    // If an error occurs during the operation, log the error message to the console.
    console.log(err.message);
  }
};

// Export the 'addContact' service function to be used in 'controllers/contacts/addContact.js'.
module.exports = getContactById;