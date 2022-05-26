const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const password = require('../middleware/password');
const limiter = require('../middleware/limiter');

router.post('/signup', password, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.get('/:id', auth, userCtrl.getOneAccount);
router.put('/:id', auth, multer, userCtrl.modifyAccount);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;