const app = require('express');
const verifyToken = require('../middleware/verifyToken');
const {
    getOrder,
    saveOrder,
    getAllOrders,
    changeOrderStatus,
    removeOrder,
} = require('../controllers/order');
const router = app.Router();

router.get('/', verifyToken, getOrder);
router.post('/', verifyToken, saveOrder);
router.get('/all', verifyToken, getAllOrders);
router.put('/', verifyToken, changeOrderStatus);
router.delete('/:orderId', verifyToken, removeOrder);

module.exports = router;
