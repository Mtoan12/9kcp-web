const jwt = require('jsonwebtoken');

const signAccessToken = (userId, email) => {
    return jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
};

const signRefreshToken = (userId, email) => {
    return jwt.sign({ userId, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7h',
    });
};

const updateUserRefreshToken = async (userModel, refreshToken) => {
    try {
        userModel.refreshToken = refreshToken;
        await userModel.save();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    updateUserRefreshToken,
};
