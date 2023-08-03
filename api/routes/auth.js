const express = require('express');
const router = express.Router();
const { register, login, loadUser, refreshToken, logout } = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');
const setTokensCookie = require('../middleware/setTokensCookie');

router.get('/', verifyToken, loadUser);
router.get('/refresh-token', refreshToken, setTokensCookie);
router.post('/register', register, setTokensCookie);
router.post('/login', login, setTokensCookie);
router.get('/logout', logout);

module.exports = router;
