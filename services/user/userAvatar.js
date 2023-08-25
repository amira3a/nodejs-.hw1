const usersOperations = require("../../controllers/userscon");


const userAvatar = async (body, file) => {
  try {
    
    const data = await usersOperations.userAvatar(body, file);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = userAvatar;