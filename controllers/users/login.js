const createError = require("http-errors");
//const  UserSchema  = require("../../models/users");
const { users: service } = require("../../services");

const login = async (req, res) => {
  
  // const { error } = UserSchema.validate(req.body);
  // if (error) {
  //   throw createError(400);
  // }

  
  const result = await service.login(req);

  if (result === "email") {
    res.status(409).json({
      status: "Conflict",
      code: 409,
      data: {
        message: "Email does not exist",
      },
    });
    return;
  }

  if (result === "password") {
    res.status(401).json({
      status: "Unathorized",
      code: 401,
      data: {
        message: "Email or password is wrong",
      },
    });
    return;
  }
  
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};


module.exports = login;