const express = require('express')

const router = express.Router()
const ctrl = require('../controller/user')

//user_id, which is sub, will be includede in the URL
router.get('/user/:userid', ctrl.usePage)
router.post('/user/:userid/create-new-doc', ctrl.createDoc)
router.post('/user/:userid/delete-doc', ctrl.deleteDoc)

module.exports.router
