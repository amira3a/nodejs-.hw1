const { users: service } = require("../../services");

const currentUser = async (req, res) => {
  const result = await service.currentUser(req);
  if (!result) {
    res.status(401).json({
      data: {
        message: 'Not Authorized',
      }
    });
    return;
    };
    res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = currentUser;