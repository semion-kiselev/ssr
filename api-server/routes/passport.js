const express = require('express');
const router = express.Router();
const {login} = require('../controllers/passport');

router.post('/login', login);

module.exports = router;