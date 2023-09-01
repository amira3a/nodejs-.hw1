const usersOperations = require("../../controllers/userscon");


const verificationUser = async (body) => {
  try {
    
    const data = await usersOperations.verificationUser(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = verificationUser;