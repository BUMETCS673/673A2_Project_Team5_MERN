const express = require('express');
const router = express.Router();
const ctrl = require('../controller/user')

//user_id, which is sub, will be includede in the URL
router.get('/user/:userid', ctrl.usePage);

module.exports.router;