const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    province: {
        type: String,
        require: true,
    },
    district: {
        type: String,
    },
    address: {
        type: String,
    },
});

module.exports = mongoose.model('delivery', deliverySchema);
