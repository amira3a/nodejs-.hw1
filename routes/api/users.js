const express = require("express");
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");
const router = express.Router();
const auth = require('../../middlewares/auth');

router.post('/login', ctrlWrapper( ctrl.login));
router.post('/signup', ctrlWrapper(ctrl.signup));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
router.post('/current', auth, ctrlWrapper(ctrl.current));

module.exports = router;