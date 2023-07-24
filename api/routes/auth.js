const express = require('express');
const router = express.Router();
const { register, login, loadUser, refreshToken, logout } = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, loadUser);
router.get('/refresh-token', refreshToken);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
