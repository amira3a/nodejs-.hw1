const createError = require("http-errors");
const { contactSchema } = require("../../schemas");
const { contacts: service, contacts } = require("../../services");


const updateContact= async (req, res, next) => {
  
  
  // If the request body is valid, call the 'getContactById' function from the 'service' module to add the new contact.
  
  const { id } = req.params;
  const { name, email, phone } = await service.updateContact(req.body);
  const [contact] = contacts.filter(item => item.id === id);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    }
  });
};


module.exports = updateContact;
