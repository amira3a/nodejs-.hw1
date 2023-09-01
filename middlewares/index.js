// Import the 'ctrlWrapper' middleware from './ctrlWrapper.js'.
const ctrlWrapper = require("./ctrlWrapper");
const auth = require("./auth");
const validation = require("./validation");
const upload = require("./multer");
const { verifyUserEmail, emailVerified } = require("./nodemailer");
module.exports = {
  ctrlWrapper,
  auth,
  validation,
  upload,
  verifyUserEmail,
  emailVerified,
};
