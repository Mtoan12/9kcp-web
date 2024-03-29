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
        default: 'Đang xử lý',
        enum: [
            'Đang xử lý',
            'Đã xác nhận',
            'Đang giao hàng',
            'Đã giao hàng',
            'Đã hoàn thành',
            'Hủy đơn hàng',
        ],
    },
    address: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('orders', OrderSchema);
