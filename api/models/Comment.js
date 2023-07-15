const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        },
        content: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = mongoose.model('comments', commentSchema);
