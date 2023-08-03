const Comments = require('../models/Comment');
const { isObjectIdValid } = require('../utils/validateData.js');

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
            const comment = new Comments({
                user: req.user._id,
                product: productId,
                content,
            });

            await comment.save();

            res.status(201).json({
                success: true,
                comment,
                message: 'Create new comment successfully',
            });
        } catch (error) {
            next(error);
        }
    }
};

const editComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { content } = req.body;

    if (req.user) {
        try {
            const findComment = await Comments.findById(commentId).populate('user').exec();

            if (findComment.user._id !== req.user._id) {
                return res.status(403).json({
                    success: false,
                    message: 'Không thể thực hiện điều này',
                });
            }

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: 'Chưa có nội dung đánh giá',
                });
            }

            const comments = await Comments.findOneAndUpdate({ _id: commentId }, { new: true });

            res.json({
                success: true,
                comments,
                message: 'Edit comment successfully',
            });
        } catch (error) {
            next(error);
        }
    }
};

const deleteComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { content } = req.body;

    if (req.user.isAdmin) {
        try {
            const findComment = await Comments.findById(commentId).populate('user').exec();

            if (findComment.user._id !== req.user._id) {
                return res.status(403).json({
                    success: false,
                    message: 'Không thể thực hiện điều này',
                });
            }

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: 'Chưa có nội dung đánh giá',
                });
            }

            const comment = await Comments.findOneAndDelete({ product: productId });

            res.json({
                success: true,
                comment,
                message: 'Edit comment successfully',
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

module.exports = {
    getCommentsByProductId,
    addNewComment,
    editComment,
    deleteComment,
};
