const { KIT, KEYCAP, KEYBOARD } = require('../constance/constance');
const Products = require('../models/Product');
const fs = require('fs');
const path = require('path');
const { isObjectIdValid } = require('../utils/validateData.js');
const { default: mongoose } = require('mongoose');

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
const getFilteredProducts = async (req, res, next) => {
    const { searchText, category } = req.query;

    try {
        if (category) {
            const products = await Products.find({
                category,
            });

            return res.json({
                success: true,
                message: 'Get products successfully',
                products,
            });
        }
        let regex = new RegExp(searchText, 'i');
        const products = await Products.find({
            $or: [
                { title: regex },
                { brand: regex },
                { category: regex },
                { inStock: isNaN(searchText) ? -1 : Number(searchText) },
                { description: regex },
                { price: isNaN(searchText) ? -1 : Number(searchText) },
            ],
        });

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

    if (!isObjectIdValid(id)) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm',
        });
    }

    try {
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }

        return res.json({
            success: true,
            message: 'Found product',
            product,
        });
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    if (req.user.isAdmin) {
        if (!req.body.info) {
            return res.status(400).json({
                success: false,
                message: 'Nội dung không hợp lệ',
            });
        }

        const { title, brand, price, inStock, category, description } = JSON.parse(req.body.info);

        try {
            const newProduct = new Products({
                title,
                brand,
                price,
                inStock,
                category,
                description,
                imageName: req.file.filename,
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
    } else {
        res.status(403).json({
            success: false,
            message: 'Không được phép làm điều này',
        });
    }
};

const editProduct = async (req, res, next) => {
    if (req.user.isAdmin) {
        const _id = req.params.id;

        if (!isObjectIdValid(_id)) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }

        const { title, brand, price, inStock, category, description } = JSON.parse(req.body.info);
        try {
            const newImageName = req?.file?.filename;
            const oldProduct = await Products.findById(_id);
            let imageName;
            if (newImageName) {
                imageName = newImageName;
                oldProduct.imageName && deleteImage(oldProduct.imageName);
            } else {
                imageName = oldProduct.imageName || `${oldProduct._id}.webp`;
            }
            //const imageName = newImageName? newImageName : oldProduct.imageName && deleteImage(oldProduct.imageName);
            const product = await Products.findOneAndUpdate(
                { _id },
                { title, brand, price, inStock, category, imageName, description },
                { new: true }
            );
            res.json({
                success: true,
                message: 'Update product successfully',
                product,
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'Không được phép làm điều này',
        });
    }
};

const removeProduct = async (req, res, next) => {
    const _id = req.params.id;

    if (!isObjectIdValid(_id)) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm',
        });
    }

    if (req.user.isAdmin) {
        try {
            const product = await Products.findOneAndDelete({ _id });
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
        res.status(403).json({
            success: false,
            message: 'Không được phép làm điều này',
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
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        return;
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
    getProduct,
    getSearch,
    getFilteredProducts,
};
