const Users = require('../models/User');
const Products = require('../models/Product');
const Orders = require('../models/OrderStatus');
const Deliveries = require('../models/Delivery');
const { default: mongoose, isValidObjectId } = require('mongoose');

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
    } else {
        res.status(403).json({
            success: false,
            message: 'Không được phép làm điều này',
        });
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
        const { productId, quantity, address } = req.body;

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
                address,
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
    } else {
        res.status(403).json({
            success: false,
            message: 'Không được phép làm điều này',
        });
    }
};

const removeOrder = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const orderId = req.params.orderId;

            if (!isValidObjectId(orderId)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy',
                });
            }

            const orderDelete = await Orders.findOneAndDelete({ _id: orderId });
            if (!orderDelete) {
                return res.json({
                    success: false,
                    message: 'Xóa thất bại',
                    orderDelete,
                });
            }

            return res.json({
                success: true,
                message: 'Xóa thành công',
                orderDelete,
            });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền làm điều này',
        });
    }
};

module.exports = {
    getOrder,
    saveOrder,
    getAllOrders,
    changeOrderStatus,
    removeOrder,
};
