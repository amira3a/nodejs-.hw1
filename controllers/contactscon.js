

const ContactSchema  = require("../models/contacts");


async function getAllContacts() {
  const allContacts = await ContactSchema.find();
  console.log(allContacts);
  return allContacts;
}


 const addContact = async (body) => {
   const newContact = await ContactSchema.create(body);
   console.log(newContact);
  return newContact;
};

 async function getContactById(req) {
  const singleContact = await ContactSchema.findById({_id:req.params.id}); 
  
     if (singleContact) {
        console.log(singleContact)
        return singleContact
    } else {
      console.log('No user with that id');
      return null;
    }
 }

 async function removeContact(req) {
   await ContactSchema.findByIdAndDelete({_id:req.params.id});
   return ('Contact deleted');
 }

 async function updateContact (req, body) {
    const updatedContact = await ContactSchema.findOneAndUpdate(
        { _id:req.params.id },
        { $set: body }, 
        { new: true },
   );
   return updatedContact;

   }
  
  async function updateStatusContact (req, body) {
   const  favorite  = await ContactSchema.findOneAndUpdate(
        { _id:req.params.id },
        { $set: body }, 
        { new: true },
   );

    if (!favorite) {
      const message = `Not Found`;
      console.log(message);
      return  message ;
    } else {
      return favorite;
     }
    
   }


module.exports = {
  getAllContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,

};
