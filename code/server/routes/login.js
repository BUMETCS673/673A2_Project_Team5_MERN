const express = require("express")
const ctrl = require("../controller/login")
router = express.Router()

router.get("/", ctrl.welcome)
router.post("/", ctrl.login)

module.exports = router
