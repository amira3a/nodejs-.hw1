
const ContactSchema  = require("../models/contacts");


async function getAllContacts() {
  const allContacts = await ContactSchema.find({});
  console.log(allContacts);
  return allContacts;
}


 const addContact = async (body) => {
   const newContact = await ContactSchema.create(body);
   console.log(newContact);
  return newContact;
};

 async function getContactById(_id) {
  const singleContact = await ContactSchema.findOne( {_id:{_id}} ); 
  
     if (singleContact) {
        console.log(singleContact)
        return singleContact
    } else {
      console.log('No user with that id');
      return null;
    }
 }

 async function removeContact(_id) {
   await ContactSchema.findOneAndDelete({ _id:{_id}});
   return ('Contact deleted');
 }

 async function updateContact (_id, body) {
    const updatedContact = await ContactSchema.findOneAndUpdate(
        { _id:{_id} },
        { $set: body }, 
        { new: true },
   );
   return updatedContact;

   }
  
  async function updateStatusContact (_id, body) {
   const  favorite  = await ContactSchema.findOneAndUpdate(
        { _id:{_id} },
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
