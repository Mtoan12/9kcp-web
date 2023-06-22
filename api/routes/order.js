const app = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getOrder, saveOrder } = require('../controllers/order');
const router = app.Router();

router.get('/', verifyToken, getOrder);
router.post('/', verifyToken, saveOrder);

module.exports = router;
