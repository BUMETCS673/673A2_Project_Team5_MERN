const express = require('express');
const ctrl = require('../controller/login')
router = express.Router()

router.get('/', ctrl.welcome)

module.exports = router;