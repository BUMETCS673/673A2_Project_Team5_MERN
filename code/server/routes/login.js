const express = require('express');
const requireLogin = require('../middleware/requireLogin.js')
const loginController = require('../controller/login.js')

const router = express.Router();

router.post('/login', loginController); 

module.exports = router;
