const Cart = require('../models/Cart');

const getCart = async (req, res, next) => {
    if (req.id) {
        try {
            const cart = await Cart.findOne({ user: req.id });
            res.json({
                success: true,
                message: 'Get cart successfully',
                cart,
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({
            success: false,
            message: 'Something is wrong',
        });
    }
};

const addNewCart = async (req, res, next) => {
    const { items } = req.body;

    if (req.id) {
        try {
            const newCart = new Cart({ user: req.id, items });
            await newCart.save();
        } catch (error) {
            next(error);
        }
    }
};
module.exports = {
    getCart,
    addNewCart,
};
