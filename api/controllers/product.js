const { KIT, KEYCAP, KEYBOARD } = require('../constance/constance');
const Products = require('../models/Product');
const fs = require('fs');
const path = require('path');
const getProducts = async (req, res, next) => {
    try {
        const products = await Products.find();
        await products.sort((a, b) => b.createAt - a.createAt);

        res.json({
            success: true,
            message: 'Get products successfully',
            products,
        });
    } catch (error) {
        next(error);
    }
};

const getProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Products.findById(id);
        console.log({ id, product });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.json({
            success: true,
            message: 'Found product',
            product,
        });
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    const { title, brand, price, inStock, category } = JSON.parse(req.body.info);

    try {
        const newProduct = new Products({
            title,
            brand,
            price,
            inStock,
            category,
            imageName: req.file.filename,
        });

        // console.log({ title, brand, price, inStock, category });
        await newProduct.save();
        // console.log(newProduct, { image: req.file });

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

    if (req.id) {
        try {
            const product = await Products.findOneAndDelete({ _id });
            console.log(product);
            deleteImage(product.imageName);
            res.json({
                success: true,
                message: 'Delete product successfully',
                product,
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({
            success: false,
            message: 'Can not delete',
        });
    }
};

const getAllKits = async (req, res, next) => {
    try {
        const kits = await Products.find({ category: KIT });
        await kits.sort((a, b) => b.createAt - a.createAt);

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
        await keycaps.sort((a, b) => b.createAt - a.createAt);

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
        await keyboards.sort((a, b) => b.createAt - a.createAt);

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

const getSearch = async (req, res, next) => {
    const { query } = req.query;
    try {
        const products = await Products.find({ title: new RegExp(query, 'i') });
        res.json({
            success: true,
            products,
            message: 'Found products',
        });
    } catch (error) {
        next(error);
    }
};

const deleteImage = (imgName) => {
    const filePath = path.join(__dirname, '../public/uploads/', imgName);
    fs.unlinkSync(filePath);
};

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    removeProduct,
    getAllKits,
    getAllKeycaps,
    getAllKeyboard,
    getProduct,
    getSearch,
};
