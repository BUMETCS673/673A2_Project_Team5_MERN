// const express = require('express')
// const ctrl = require('../controller/document')

import express from 'express';
import ctrl from '../controller/document.js';

const router = express.Router()

router.get('/:docId/', ctrl.getDocument)
router.post('/:docId/update-content', ctrl.updateContent)
router.post('/:docId/update-summary', ctrl.updateSummary)

export default router;
