const express = require('express');
const router = express.Router();
const {getArticles} = require('../controllers/articles');

router.get('/', getArticles);

module.exports = router;