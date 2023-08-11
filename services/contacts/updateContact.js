const contactsOperations = require("../../controllers/contacts");


const updateContact = async (_id, body) => {
  try {
    
    const data = await contactsOperations.updateContact(_id, body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};

// Export the 'updateContact' service function to be used in 'controllers/contacts/addContact.js'.
module.exports = updateContact;