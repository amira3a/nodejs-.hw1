const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentuser");
const userAvatar = require("./userAvatar");
const verificationUser = require('./verificationUser');
const verifiedUserEmail = require('./verifiedUserEmail');



module.exports = {
    signup,
    login,
    logout,
    currentUser,
    userAvatar,
    verificationUser,
    verifiedUserEmail,
}