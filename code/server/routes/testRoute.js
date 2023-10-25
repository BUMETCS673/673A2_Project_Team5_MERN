const express = require('express');

const router = express.Router();
const ctrl = require('../controller/test')

router.post('/', ctrl.test);

module.exports.router;
