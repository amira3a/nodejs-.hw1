const usersOperations = require("../../controllers/userscon");


const login = async (body) => {
  try {
    
    const data = await usersOperations.login(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = login;
