const { getCart, addNewCart } = require('../controllers/cart');
const verifyToken = require('../middleware/verifyToken');

const router = require('express').Router();

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addNewCart);
module.exports = router;
