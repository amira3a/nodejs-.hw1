const { users: service } = require("../../services");

const verificationUser = async (req, res) => {



  const result = await service.verificationUser(req);
  if (!result) {
    res.status(404).json({
      data: {
        message: 'User not found',
      }
    });
    return;
    };
    res.status(200).json({
    status: "success",
    code: 200,
    data: {
       message: 'Verification successful',
    },
  });
};

module.exports = verificationUser;