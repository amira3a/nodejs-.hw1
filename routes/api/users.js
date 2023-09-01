const express = require("express");
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper, upload} = require("../../middlewares");
const router = express.Router();



//const oneUserSchema = require("../../models/users");

router.post('/login',  ctrlWrapper( ctrl.login));
router.post('/signup', ctrlWrapper(ctrl.signup));
router.post('/logout',  ctrlWrapper(ctrl.logout));
router.post('/current', ctrlWrapper(ctrl.currentUser));
router.patch('/avatars', upload.single('avatar'), ctrlWrapper(ctrl.userAvatar));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verificationUser));
router.post('/verify', ctrlWrapper(ctrl.verifiedUserEmail));



module.exports = router;