const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, '/db/contacts.json');

const read = fs.readFile(contactsPath).then((data) => {
  const allData = JSON.parse(data);
  return allData
});



// TODO: document each function
async function listContacts() {
  const data = await read; 
  console.table(data);
  return data
};


async function getContactById(id) {
  const data = await read; 
  const singleContact = data.find(item => item.id === id); 
  
    if (singleContact) {
       console.log(singleContact)
        return singleContact
    } else {
        console.log('No user with that id');
    }
}

async function removeContact(id) {
  const data = await read; 
    const newData = data.filter(item => item.id !== id);
    fs.writeFile(contactsPath, JSON.stringify(newData));
    console.log('Contact deleted');
    return newData;
}

async function addContact(name, email, phone) {
  const data = await read;
    const newContact = {
        id: "",
        name: name,
        email: email,
        phone: phone,
    }
    data.push(newContact);
    console.log(newContact)

    try {
        fs.writeFile(contactsPath, JSON.stringify(data))
        console.log('Contact added successfully')
    } catch (error) {
        console.error('Error while adding contract', error.message);
    }
    
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
