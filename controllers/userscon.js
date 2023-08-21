const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



  async function signup(req) {
    try {
      const { email, password } = req.body;
      const emailExists = await User.findOne({ email }) !== null;
        if (emailExists) {
        return emailExists;
        }
      const hashed = await bcrypt.hash(password, 10);
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const newUser = await User.create({
        email: email,
        password: hashed,
        token: token,
      });
      req.session.userToken = token;
      req.session.userId = newUser._id;
      return({email:email, subscription:"starter"});
    } catch (err) {
      console.log(err);
      
    }
  }
  async function login(req) {
    try {
      const { email, password } = req.body;
      const singleUser = await User.findOne({ email: email });
      if (!singleUser) {
        return "email";
      }
      const validatingPW = await singleUser.checkPassword(password);

      if (!validatingPW) {
        return "password";
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      req.session.userToken = token;
      req.session.userId = singleUser._id;
      singleUser.token = token; // Update the user's token
      await singleUser.save();
      return ({
  "user": {
    email: email,
    subscription: "starter",
  }
});
      
    } catch (err) {
      console.log(err);
      
    }
  }
async function logout(req) {
  // await User.findOneAndUpdate(
  //   { email: req.body.email },
  //   { $set: { token: null } }
  // );
// if (req.session) {
//       req.session.destroy(() => {
//         console.log({ message: 'User was signed out' });
//       });
//     } else {
//       console.log({ message: 'You are already signed out' });
//     }
  try {
     const { email } = req.body;
    const singleUser = await User.findOne({ email: email });
     if (!singleUser) {
      return false; // Return false if user not found
    }
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
    }); // Destroy the session
    return true; // Return true for successful logout
  } catch (err) {
    console.log(err);
  };
}

async function currentUser(req) {
  try {
    const currentUser = await User.findById(req.session.userId);
    if (currentUser === null) {
      return 'Not Authorized'
    }
    const { email } = req.body; 
    return ({email:email});
  }catch (err) {
      console.log(err);
      
    }
}
  

module.exports = {
  signup,
  login,
  logout,
  currentUser,
};
