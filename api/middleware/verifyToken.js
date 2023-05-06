const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { userId } = decode;
        try {
            const user = await User.findById(userId);
            if (user) {
                req.id = userId;
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Token is missing',
        });
    }
};

module.exports = verifyToken;
