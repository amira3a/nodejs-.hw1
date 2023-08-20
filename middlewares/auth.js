const auth = (req, res, next) => {
  //  const user = user.findOne({ email: req.body.email });
  //   if (!user.token) {
  //     res.json({ message: 'asjkhdakjsd' });
  //   } else {
  //     next();
  //   }
  if (!req.sission.userToken) {
     res.status(401).json({
      status: "Unathorized",
      code: 401,
      data: {
        message: 'You are not authorized. Please login.',
      },
    });
  } else {
    next();
  }
};

module.exports = auth;