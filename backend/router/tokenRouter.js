const express = require('express');
const { allToken, addToken } = require('../controller/tokenController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
router.get('/alltoken', allToken);
router.post('/createtoken', isAuthenticated, addToken);
module.exports = router;
