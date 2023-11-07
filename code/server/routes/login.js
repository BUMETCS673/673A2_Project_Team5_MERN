const express = require('express');
const verifyToken = require('../middleware/verifyToken.js');
const loginController = require('../controller/login.js');

const router = express.Router();

router.post('/login', loginController);
router.post('/verify-token', verifyToken);

module.exports = router;
