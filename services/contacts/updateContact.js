const contactsOperations = require("../../models/contacts");


const updateContact = async (id, body) => {
  try {
    
    const data = await contactsOperations.updateContact(id, body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};

// Export the 'updateContact' service function to be used in 'controllers/contacts/addContact.js'.
module.exports = updateContact;