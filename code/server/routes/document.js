const express = require('express')
const ctrl = require('../controller/document')

const router = express.Router()

router.get('/:docId/', ctrl.getDocument)
router.post('/:docId/update-content', ctrl.updateContent)
router.post('/:docId/update-summary', ctrl.updateSummary)

module.exports = router
