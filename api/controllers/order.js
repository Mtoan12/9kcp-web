const Users = require('../models/User');
const Products = require('../models/Product');
const Orders = require('../models/OrderStatus');
const { default: mongoose } = require('mongoose');

const getOrder = async (req, res, next) => {
    if (req.id) {
        const userId = req.id;
        try {
            const allUserOrders = await Orders.find({ userId: userId })
                .populate('productId')
                .exec();
            const objIds = allUserOrders.map(
                (order) => new mongoose.Types.ObjectId(order.productId)
            );

            const products = await Products.find({ _id: { $in: objIds } });
            res.json({
                success: true,
                orders: allUserOrders,
                message: 'Get orders successfully',
            });
        } catch (error) {
            next(error);
        }
    }
};

const checkProductQuantity = (product, quantity) => {
    try {
        if (!product) {
            return false;
        }

        return quantity <= product.inStock;
    } catch (error) {
        return false;
    }
};

const saveOrder = async (req, res, next) => {
    if (req.id) {
        const userId = req.id;
        const { productId, quantity } = req.body;

        console.log({ productId, quantity });
        const product = await Products.findById(productId);
        if (!product) {
            return res.json({
                success: false,
                message: 'Invalid order',
            });
        }
        if (!checkProductQuantity(product, quantity)) {
            return res.json({
                success: false,
                message: 'Invalid order',
            });
        }
        try {
            const newOrder = new Orders({
                userId,
                productId,
                quantity,
            });

            const saveNewOrder = newOrder.save();
            const updateQuantity = Products.findOneAndUpdate(
                { _id: productId },
                { inStock: product.inStock - quantity }
            );

            Promise.all([saveNewOrder, updateQuantity]);

            res.json({
                success: true,
                message: 'Add new order',
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    getOrder,
    saveOrder,
};
