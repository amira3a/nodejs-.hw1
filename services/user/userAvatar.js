const usersOperations = require("../../controllers/userscon");


const userAvatar = async (file) => {
  try {
    
    const data = await usersOperations.userAvatar(file);
    
    return data;
  } catch (err) {
    
    console.log(err.message);
  }
};


module.exports = userAvatar;