const mongoose = require('mongoose');
const { KEYBOARD, KEYCAP, KIT } = require('../constance/constance');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    review: {
        type: Number,
        default: 0,
    },
    inStock: {
        type: Number,
        default: 0,
    },
    imageName: {
        type: String,
    },
    category: {
        type: String,
        enum: [KEYBOARD, KEYCAP, KIT],
        default: KEYBOARD,
    },
    description: {
        type: String,
        default: 'Chưa có mô tả',
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('products', productSchema);
