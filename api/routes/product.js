const express = require('express');
const router = express.Router();
const {
    getProducts,
    addProduct,
    editProduct,
    removeProduct,
    getAllKits,
    getAllKeycaps,
    getAllKeyboard,
} = require('../controllers/product');

router.get('/', getProducts);
router.post('/add-product', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

router.get('/kit', getAllKits);
router.get('/keycap', getAllKeycaps);
router.get('/keyboard', getAllKeyboard);

module.exports = router;
