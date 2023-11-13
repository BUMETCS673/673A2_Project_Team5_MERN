const express = require('express');

const router = express.Router();
const ctrl = require('../controller/user');
const verifyToken = require('../middleware/verifyToken');

//user_id, which is sub, will be includede in the URL
router.get('/:userId', /*verifyToken,*/ ctrl.getUser);
router.post('/create-new-doc', /*verifyToken,*/ ctrl.createDoc);
// remove userId once middleware works
// router.delete('/delete-doc/:docId', /*verifyToken,*/ ctrl.deleteDoc);
router.delete('/delete-doc/:docId/:userId', /*verifyToken,*/ ctrl.deleteDoc);

module.exports = router;
