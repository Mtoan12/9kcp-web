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
    getProduct,
    getSearch,
} = require('../controllers/product');

router.get('/', getProducts);
router.get('/search', getSearch);

router.post('/add-product', addProduct);

router.get('/detail/:id', getProduct);
router.put('/detail/:id', editProduct);
router.delete('/detail/:id', removeProduct);

router.get('/kit', getAllKits);
router.get('/keycap', getAllKeycaps);
router.get('/keyboard', getAllKeyboard);

module.exports = router;
