const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_APIKEY,
    },
    tls: {
        rejectUnauthorized: false,
    }
});
const verifyUserEmail = async (email, verificationToken) => {
  try {
    const verifyMessage = {
      from: process.env.EMAIL_NAME,
      to: email,
      subject: 'Verify email',
      text: 'Please use the link to verify your email.',
      html: `<p>Click:</p><a href="http://localhost:3000/api/users/verify/${verificationToken}">Verify Email Link</a>`
    }
    transporter.sendMail(verifyMessage);
  } catch (error) {
    console.log(error);
  };
};
const emailVerified = async (email) => {
  try {
    const verifiedMessage = {
      from: process.env.EMAIL_NAME,
      to: email,
      subject: 'Thank you!',
      text: 'Email Verified!.',
      html: `<p>Your email is verified</p>`
    };
    transporter.sendMail(verifiedMessage);
  } catch (error) {
    console.log(error);
  };
}

module.exports = {
  verifyUserEmail,
  emailVerified,
};