const express = require('express')

const router = express.Router()
const ctrl = require("../controller/user")
const requireLogin = require('../middleware/requireLogin');

//user_id, which is sub, will be includede in the URL
router.get("/", /*requireLogin,*/ctrl.getUser);
router.post("/create-new-doc",/*requireLogin,*/ ctrl.createDoc)
router.delete("/delete-doc/:docId", /*requireLogin,*/ctrl.deleteDoc)

module.exports = router;
