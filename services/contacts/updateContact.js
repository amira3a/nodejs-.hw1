const contactsOperations = require("../../models/contacts");


const updateContact = async (body) => {
  try {
    
    const data = await contactsOperations.updateContact(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};

// Export the 'addContact' service function to be used in 'controllers/contacts/addContact.js'.
module.exports = updateContact;