const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup',  userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneAccount);
router.get('/',  auth, userCtrl.getAllAccounts);
router.put('/:id', auth, userCtrl.modifyAccount);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;