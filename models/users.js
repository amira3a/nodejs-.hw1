const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const usersSchema = new Schema(
  {
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },  
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
        }
 }
);

usersSchema.methods.checkPassword = async function (loginPW) {
  return bcrypt.compare(loginPW, this.password)
}

const UserSchema = model('users', usersSchema);
module.exports = UserSchema;