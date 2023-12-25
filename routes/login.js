const express = require("express");
const router = express.Router();
const lo = require('../controllers/login_controller');

router.get('/',  lo.login);

module.exports = router;
