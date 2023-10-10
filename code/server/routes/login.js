const express = require('express')
const router = express.Router();
const ctrl = require('../controller/login')

router.get('/', ctrl.welcome)