const contactsOperations = require("../../controllers/contacts");


const updateStatusContact = async (_id, body) => {
  try {
    
    const data = await contactsOperations.updateStatusContact(_id, body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};

// Export the 'updateStatusContact' service function to be used in 'controllers/contacts/addContact.js'.
module.exports = updateStatusContact;