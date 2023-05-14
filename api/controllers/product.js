const { KIT, KEYCAP, KEYBOARD } = require('../constance/constance');
const Products = require('../models/Product');

const getProducts = async (req, res, next) => {
    try {
        const products = await Products.find();
        res.json({
            success: true,
            message: 'Get products successfully',
            products,
        });
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    const { title, brand, price, inStock, category } = req.body;

    try {
        const newProduct = new Products({
            title,
            brand,
            price,
            inStock,
            category,
        });
        await newProduct.save();

        res.json({
            success: true,
            message: 'Add new product successfully',
            newProduct,
        });
    } catch (error) {
        next(error);
    }
};

const editProduct = async (req, res, next) => {
    const _id = req.params.id;
    const { title, brand, price, inStock, category } = req.body;
    try {
        const product = await Products.findOneAndDelete({ _id });
        res.json({
            success: true,
            message: 'Update product successfully',
        });
    } catch (error) {
        next(error);
    }
};

const removeProduct = async (req, res, next) => {
    const _id = req.params.id;

    try {
        await Products.findOneAndDelete({ _id });
        res.json({
            success: true,
            message: 'Delete product successfully',
        });
    } catch (error) {
        next(error);
    }
};

const getAllKits = async (req, res, next) => {
    try {
        const kits = await Products.find({ category: KIT });

        if (kits) {
            res.json({
                success: true,
                message: 'Get kits successfully',
                products: kits,
            });
        } else {
            res.json({
                success: false,
                message: 'Failed to get Kits',
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAllKeycaps = async (req, res, next) => {
    try {
        const keycaps = await Products.find({ category: KEYCAP });

        if (keycaps) {
            res.json({
                success: true,
                message: 'Get keycaps successfully',
                products: keycaps,
            });
        } else {
            res.json({
                success: false,
                message: 'Failed to get keycaps',
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAllKeyboard = async (req, res, next) => {
    try {
        const keyboards = await Products.find({ category: KEYBOARD });

        if (keyboards) {
            res.json({
                success: true,
                message: 'Get Keyboards successfully',
                products: keyboards,
            });
        } else {
            res.json({
                success: false,
                message: 'Failed to get Keyboards',
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    removeProduct,
    getAllKits,
    getAllKeycaps,
    getAllKeyboard,
};
