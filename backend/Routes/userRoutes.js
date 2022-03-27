const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup',  userCtrl.signup);
router.get('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneAccount);
router.get('/', userCtrl.getAllAccounts);
router.put('/:id', multer, userCtrl.modifyAccount);
router.delete('/:id', userCtrl.deleteAccount);

module.exports = router;