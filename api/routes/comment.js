const express = require('express');
const { getCommentsByProductId, addNewComment } = require('../controllers/comment');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/:productId', getCommentsByProductId);
router.post('/:productId', verifyToken, addNewComment);

module.exports = router;
