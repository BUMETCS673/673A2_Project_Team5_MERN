// const express = require('express')
// const ctrl = require('../controller/document')

import express from 'express';
import ctrl from '../controller/document.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router()

router.get('/:docId/', verifyToken, ctrl.getDocument)
router.post('/:docId/update-content', verifyToken, ctrl.updateContent)
router.post('/:docId/update-summary', verifyToken, ctrl.updateSummary)



export default router;
