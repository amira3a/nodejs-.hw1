const usersOperations = require("../../controllers/userscon");


const currentUser = async (body) => {
  try {
    
    const data = await usersOperations.currentUser(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = currentUser;