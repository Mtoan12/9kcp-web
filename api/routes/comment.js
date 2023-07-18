const express = require('express');
const {
    getCommentsByProductId,
    addNewComment,
    editComment,
    deleteComment,
} = require('../controllers/comment');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/:productId', getCommentsByProductId);
router.post('/:productId', verifyToken, addNewComment);
router.put('/:commentId', verifyToken, editComment);
router.delete('/:commentId', verifyToken, deleteComment);

module.exports = router;
