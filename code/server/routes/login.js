const express = require('express');
const requireLogin = require('../middleware/requireLogin.js')
const loginController = require('../controller/login.js')

const router = express.Router();

router.post('/login', loginController); 

// router.get('/protected', requireLogin, (req, res) => {
//   res.json({ message: 'This is a protected route.', user: req.user });
// });  

module.exports = router;
