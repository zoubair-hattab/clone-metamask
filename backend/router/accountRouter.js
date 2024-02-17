const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const {
  createAccount,
  allAccount,
} = require('../controller/accountController');
const router = express.Router();
router.get('/allaccount', allAccount);
router.post('/createaccount', isAuthenticated, createAccount);
module.exports = router;
