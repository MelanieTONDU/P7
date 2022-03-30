const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, articleCtrl.createArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.get('/', articleCtrl.getAllArticles);

module.exports = router;