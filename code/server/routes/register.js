const express = require('express')
router = express.Router();
const ctrl = require('../controller/register')

router.get('/', ctrl.welcome)

module.exports = router;