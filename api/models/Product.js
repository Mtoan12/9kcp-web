const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
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
});
