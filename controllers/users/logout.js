const { users: service } = require("../../services");

const logout = async (req, res) => {

  const { error } = UserSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }

  const result = await service.logout(req);
  if (!result) {
    res.status(401).json({
      data: {
        message: 'Not Authorized',
      }
    });
    return;
  };
  res.status(204).send();
};

module.exports = logout;