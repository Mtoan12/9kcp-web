const Users = require('../models/User');
const Products = require('../models/Product');
const Orders = require('../models/OrderStatus');
const Deliveries = require('../models/Delivery');
const { default: mongoose } = require('mongoose');

const getAllOrders = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const orders = await Orders.find({}).populate('userId').populate('productId').exec();

            // const address = await Deliveries.find().where('userId').in(orders.userId._id).exec();
            // const address = await Deliveries.find().where('userId').in(orders.userId._id).exec();

            res.json({
                success: true,
                message: 'Get all orders',
                orders,
            });
        } catch (error) {
            next(error);
        }
    }
};

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
                products,
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

const changeOrderStatus = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const { status, userId, productId } = req.body;
            console.log({ status, userId, productId });
            const rs = await Orders.findOneAndUpdate(
                { userId, productId },
                { status: status },
                { new: true }
            );

            res.json({
                success: true,
                rs,
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    getOrder,
    saveOrder,
    getAllOrders,
    changeOrderStatus,
};
