const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const Jimp = require('jimp');


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
      const userAvatar = gravatar.profile_url(email, { protocol: 'https' });
      const newUser = await User.create({
        email: email,
        password: hashed,
        token: token,
        avatarURL: userAvatar,
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


 async function userAvatar(req)  {
   const user = await User.findById(req.session.userId);
  const { path: tmp } = req.file;
  console.log(tmp)
  const avatarStorage = path.join(process.cwd(), './public/avatars');
  const fileName = path.join(avatarStorage, user.email + '.jpg');
  try {
    await Jimp.read(tmp)
      .then((avatar) => {
        return avatar
          .resize(250, 250)
          .write(fileName)
      });
    const updateUserAvatar = await User.findByIdAndUpdate(
      user._id,
      { avatarURL: `/avatars/${path.basename(fileName)}` },
      { new: true }
    )
    return updateUserAvatar;
  } catch (error) {
    console.log(error);
  };
};
  

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  userAvatar,
};
