const Comments = require('../models/Comment');
const isObjectIdValid = require('../utils/isObjectIdValid');

const getCommentsByProductId = async (req, res, next) => {
    const productId = req.params.productId;

    if (!isObjectIdValid(productId)) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm',
        });
    }

    try {
        const comments = await Comments.find({ product: productId })
            .populate('user', '-password')
            .populate('product')
            .exec();

        if (comments) {
            res.json({
                success: true,
                comments,
                message: 'Get comments successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Failed to get comments',
            });
        }
    } catch (error) {
        next(error);
    }
};
const addNewComment = async (req, res, next) => {
    const productId = req.params.productId;
    const { content } = req.body;

    if (req.user) {
        try {
            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: 'Chưa có nội dung đánh giá',
                });
            }
            const comments = new Comments({
                user: req.user._id,
                product: productId,
                content,
            });

            await comments.save();

            res.status(201).json({
                success: true,
                comments,
                message: 'Create new comments successfully',
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    getCommentsByProductId,
    addNewComment,
};
