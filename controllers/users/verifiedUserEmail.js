const { users: service } = require("../../services");

const verifiedUserEmail = async (req, res) => {

  
  const result = await service.verifiedUserEmail(req);

  if (!result) {
    res.status(400).json({
      data: {
        message: 'Verification has already been passed',
      }
    });
    return;
    };
    res.status(200).json({
    status: "success",
    code: 200,
    data: {
       message: 'Verification email sent',
    },
  });
};


module.exports = verifiedUserEmail;