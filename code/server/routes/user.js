// const express = require('express');
// const ctrl = require('../controller/user');
// const verifyToken = require('../middleware/verifyToken');

import express from 'express';
import ctrl from '../controller/user.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
//user_id, which is sub, will be includede in the URL
router.get('/:userId', /*verifyToken,*/ ctrl.getUser);
router.post('/create-new-doc', /*verifyToken,*/ ctrl.createDoc);
// remove userId once middleware works
// router.delete('/delete-doc/:docId', /*verifyToken,*/ ctrl.deleteDoc);
router.delete('/delete-doc/:docId/:userId', /*verifyToken,*/ ctrl.deleteDoc);

export default router;
