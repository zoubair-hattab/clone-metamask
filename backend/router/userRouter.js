const express = require('express');
const {
  createUser,
  login,
  activationPost,
  loadUser,
  logout,
} = require('../controller/userController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
router.post('/create-user', createUser);
router.post('/activation', activationPost);
router.post('/login-user', login);
router.get('/getuser', isAuthenticated, loadUser);
router.get('/logout', isAuthenticated, logout);

module.exports = router;
