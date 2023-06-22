const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'users',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'products',
    },
    quantity: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: 'Đang giao hàng',
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('orders', OrderSchema);
