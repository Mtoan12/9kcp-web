const app = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getOrder, saveOrder, getAllOrders } = require('../controllers/order');
const router = app.Router();

router.get('/', verifyToken, getOrder);
router.post('/', verifyToken, saveOrder);
router.get('/all', verifyToken, getAllOrders);

module.exports = router;
