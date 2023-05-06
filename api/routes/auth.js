const express = require('express');
const router = express.Router();
const { register, login, loadUser } = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, loadUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
