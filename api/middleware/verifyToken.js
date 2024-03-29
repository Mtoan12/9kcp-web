const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.cookies['access_token'];
    if (token) {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { userId } = decode;
        try {
            const user = await User.findById(userId).select('-password');
            if (user) {
                req.id = userId;
                req.user = user;
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    success: false,
                    message: 'Token hết hạn',
                });
            }
            next(error);
        }
    } else {
        if (req.cookies['refresh_token']) {
            return res.status(401).json({
                success: false,
                message: 'Token hết hạn',
            });
        }
        res.status(400).json({
            success: false,
            message: 'Token is missing',
        });
    }
};

module.exports = verifyToken;
