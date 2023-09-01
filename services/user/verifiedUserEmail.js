const usersOperations = require("../../controllers/userscon");


const verifiedUserEmail = async (body) => {
  try {
    
    const data = await usersOperations.verifiedUserEmail(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = verifiedUserEmail;