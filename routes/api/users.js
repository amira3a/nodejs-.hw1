const express = require("express");
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper, validation } = require("../../middlewares");
const router = express.Router();

const oneUserSchema = require("../../models/users");

router.post('/login',  ctrlWrapper( ctrl.login));
router.post('/signup', ctrlWrapper(ctrl.signup));
router.post('/logout',  ctrlWrapper(ctrl.logout));
router.post('/current', ctrlWrapper(ctrl.currentUser));

module.exports = router;