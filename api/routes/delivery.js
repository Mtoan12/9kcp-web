const verifyToken = require('../middleware/verifyToken');
const { getAddress, postAddress, editAddress } = require('../controllers/delivery');

const app = require('express');
const router = app.Router();

router.get('/', verifyToken, getAddress);
router.post('/', verifyToken, postAddress);
router.put('/', verifyToken, editAddress);

module.exports = router;
