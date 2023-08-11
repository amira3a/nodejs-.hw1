const createError = require("http-errors");
const  ContactSchema  = require("../../models/contacts");
const { contacts: service} = require("../../services");


const updateStatusContact= async (req, res) => {
   


  const { error } = ContactSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing fields");
  }

  const { _id } = req.params;
  
  const result = await service.updateStatusContact(_id, req.body);
   if (!result) {
    throw createError(404, "not found");
    }
    res.json({
    status: 'success',
    code: 200,
    data: {
       result,
    }
  });
};


module.exports = updateStatusContact;