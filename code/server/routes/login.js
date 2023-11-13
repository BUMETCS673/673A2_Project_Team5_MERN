// const express = require('express');
// const verifyToken = require('../middleware/verifyToken.js');
// const loginController = require('../controller/login.js');

import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import loginController from '../controller/login.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/verify-token', verifyToken);

export default router;
