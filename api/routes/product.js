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
    getFilteredProducts,
} = require('../controllers/product');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getProducts);
router.get('/filter', getFilteredProducts);
router.get('/search', getSearch);

router.post('/add-product', verifyToken, upload.single('image'), addProduct);

router.get('/detail/:id', getProduct);
router.put('/detail/:id', verifyToken, upload.single('image'), editProduct);
router.delete('/detail/:id', verifyToken, removeProduct);

router.get('/kit', getAllKits);
router.get('/keycap', getAllKeycaps);
router.get('/keyboard', getAllKeyboard);

const Products = require('../models/Product');
router.post('/sua-image', async (req, res) => {
    const { id, imageName, imageUrl } = req.body;
    try {
        const edit = await Products.findByIdAndUpdate(id, { imageName, imageUrl }, { new: true });

        if (!edit) {
            res.json({ success: false, message: error.message });
        }

        res.json({ success: true, message: 'edited successfully', edit });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;
