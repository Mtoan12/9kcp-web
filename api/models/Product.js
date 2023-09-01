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
        default: '',
    },
    imageUrl: {
        type: String,
        default:
            'https://res-console.cloudinary.com/dlylqm8fu/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/S2ljYXAvZWZsZm9ydHM5Z3g3OXd2anNyZm8=/template_primary',
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
