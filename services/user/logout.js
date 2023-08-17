const usersOperations = require("../../controllers/userscon");


const logout = async (body) => {
  try {
    
    const data = await usersOperations.logout(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = logout;