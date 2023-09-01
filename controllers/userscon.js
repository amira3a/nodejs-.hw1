const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const Jimp = require('jimp');
const { verifyUserEmail, emailVerified } = require('../middlewares');
const  {nanoid} = require('nanoid');




  async function signup(req) {
    try {
      const { email, password } = req.body;
      const emailExists = await User.findOne({ email }) !== null;
        if (emailExists) {
        return emailExists;
      };
      
      const hashed = await bcrypt.hash(password, 10);
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const userAvatar = gravatar.profile_url(email);
      const verificationToken = nanoid();
      verifyUserEmail(email, verificationToken);

      const newUser = await User.create({
        email: email,
        password: hashed,
        token: token,
        avatarURL: userAvatar,
        verificationToken: verificationToken,
      });
      req.session.userToken = token;
      req.session.userId = newUser._id;
      return({email:email, avatarURL: userAvatar, subscription:"starter"});
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


async function userAvatar(req) {
  const user = await User.findById(req.session.userId);
  const { path: tmpName } = req.file;
    const avatarStorage = path.join(process.cwd(), 'public/avatars');
    const fileName = path.join(avatarStorage, user.email + '.jpg');
    try {
      await Jimp.read(tmpName)
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
}

async function verificationUser(req) {
  try {
    const { email } = req.body;
    if (!email) {
      return 'missing email';
    };
    const emailExists = await User.findOne({ email: email }) !== null;
    if (!emailExists) {
      return 'email not exists'
    }
    const verifiedEmail = await User.findOne({ email: email, verify: true }) !== null;
    if (verifiedEmail) {
      return 'verified email';
    };
    const user = await User.findOne({ email: email })
    const verificationToken = user.verificationToken
    verifyUserEmail(email, verificationToken);
    return 'email sent';
  } catch (error) {
    console.log(error.message);
  };
}

async function verifiedUserEmail(req) {
   try {
    const verificationToken = req.params.verificationToken
    const user = await User.findOne({ verificationToken: verificationToken });
    if (!user) {
      return 'Not Found'
    };
    const verifiedEmail = user.verify;
    if (verifiedEmail) {
      return 'already verified';
    };
    emailVerified(user.email, verificationToken)
    const verifyUser = await User.findOneAndUpdate(
      { verificationToken: verificationToken },
      { $set: { verify: true } },
      { new: true }
    );
    return verifyUser;
  } catch (error) {
    console.log(error);
  };
}


module.exports = {
  signup,
  login,
  logout,
  currentUser,
  userAvatar,
  verificationUser,
  verifiedUserEmail,
};
