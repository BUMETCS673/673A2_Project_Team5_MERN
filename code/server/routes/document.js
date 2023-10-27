const express = require('express')
const ctrl = require('../controller/document')

const router = express.Router()

router.post('/document/:docid/update-content', ctrl.updateContent)
router.post('/document/:docid/update-summary', ctrl.updateSummary)

module.exports = router
