
const usersOperations = require("../../controllers/userscon");


const signup = async (body) => {
  try {
    
    const data = await usersOperations.signup(body);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = signup;
