require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
    signAccessToken,
    signRefreshToken,
    updateUserRefreshToken,
} = require('../services/user.service');
const { isValidEmail, isValidPassword } = require('../utils/validateData');

const register = async (req, res, next) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: 'Chưa nhập đủ thông tin',
        });
    }

    if (!isValidEmail(email) || !isValidPassword) {
        return res.status(400).json({
            success: false,
            message: 'Email hoặc mật khẩu không phù hợp',
        });
    }

    const checkExisted = await User.exists({ email: email });

    if (checkExisted) {
        return res.status(409).json({
            success: false,
            message: 'Email đã tồn tại',
        });
    }
    try {
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT));
        const newUser = new User({
            email,
            password: hashPassword,
            name,
        });

        await newUser.save();

        const accessToken = signAccessToken(newUser._id, email);
        const refreshToken = signRefreshToken(newUser._id, email);

        try {
            await updateUserRefreshToken(newUser, refreshToken);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật refresh token',
            });
        }

        req.accessToken = accessToken;
        req.refreshToken = refreshToken;
        req.actionType = 'register';

        next();
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Chưa nhập email hoặc mật khẩu',
        });
    }

    if (!isValidEmail(email) || !isValidPassword) {
        return res.status(400).json({
            success: false,
            message: 'Email hoặc mật khẩu không phù hợp',
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Sai email hoặc mật khẩu',
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: 'Sai email hoặc mật khẩu',
            });
        }

        const accessToken = signAccessToken(user._id, email);
        const refreshToken = signRefreshToken(user._id, email);

        try {
            await updateUserRefreshToken(user, refreshToken);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật refresh token',
            });
        }

        req.accessToken = accessToken;
        req.refreshToken = refreshToken;
        req.actionType = 'login';

        next();
    } catch (error) {
        next(error);
    }
};
const logout = (req, res, next) => {
    try {
        res.cookie('access_token', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            // domain: 'https://kicap.vercel.app',
        });
        res.cookie('refresh_token', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            // domain: 'https://kicap.vercel.app',
        });

        res.json({
            success: true,
            message: 'Đăng xuất thành công',
        });
    } catch (error) {
        next(error);
    }
};

const loadUser = (req, res) => {
    const { user } = req;
    if (user) {
        res.json({
            success: true,
            message: 'Found user',
            user,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'User not provided',
        });
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refresh_token'];
        if (refreshToken) {
            const user = await User.findOne({ refreshToken });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Không tìm thấy Refresh Token',
                });
            }

            const newAccessToken = signAccessToken(user._id, user.email);
            const newRefreshToken = signRefreshToken(user._id, user.email);

            try {
                await updateUserRefreshToken(user, newRefreshToken);
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Lỗi khi cập nhật refresh token',
                });
            }

            req.accessToken = newAccessToken;
            req.refreshToken = newRefreshToken;
            req.actionType = 'refreshToken';

            next();
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy Refresh Token',
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    loadUser,
    refreshToken,
};
