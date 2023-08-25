const createError = require("http-errors");
//const  UserSchema  = require("../../models/users");
const { users: service } = require("../../services");

const signup = async (req, res) => {
  
  // const { error } = UserSchema.validate(req.body);

  
  // if (error) {
  //   throw createError(400, "Missing required field");
  // }

  
  const result = await service.signup(req);

  
   if (result === true) {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      data: {
        message: "Email in use",
      },
    });
    return;
  };
  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};


module.exports = signup;