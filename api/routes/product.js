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
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getProducts);
router.get('/search', getSearch);

router.post('/add-product', upload.single('image'), addProduct);

router.get('/detail/:id', getProduct);
router.put('/detail/:id', verifyToken, editProduct);
router.delete('/detail/:id', verifyToken, removeProduct);

router.get('/kit', getAllKits);
router.get('/keycap', getAllKeycaps);
router.get('/keyboard', getAllKeyboard);

module.exports = router;
