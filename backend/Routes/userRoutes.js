const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup',  userCtrl.signup);
router.get('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneAccount);
router.get('/', userCtrl.getAllAccounts);
router.put('/:id', auth, userCtrl.modifyAccount);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;