require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
    signAccessToken,
    signRefreshToken,
    updateUserRefreshToken,
} = require('../services/user.service');

const register = async (req, res, next) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: 'Chưa nhập đủ thông tin',
        });
    }

    const checkExisted = await User.findOne({ email: email });

    if (checkExisted) {
        return res.status(400).json({
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

        const accessToken = signAccessToken(user._id, email);
        const refreshToken = signRefreshToken(user._id, email);
        await updateUserRefreshToken(newUser, refreshToken);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: 'Tạo tài khoản thành công',
        });
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

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email không tồn tại',
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
        console.log((accessToken, refreshToken));
        await updateUserRefreshToken(user, refreshToken);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
        });
    } catch (error) {
        next(error);
    }
};
const logout = (req, res, next) => {
    try {
        res.cookie('access_token', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        });
        res.cookie('refresh_token', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        });

        res.json({
            success: true,
            message: 'Đăng xuất thành công',
        });
    } catch (error) {
        next(error);
    }
};

const loadUser = async (req, res) => {
    const userId = req.id;
    if (userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (user) {
                res.json({
                    success: true,
                    message: 'Found user',
                    user,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'User not found',
                });
            }
        } catch (error) {
            next(error);
        }
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refresh_token'];

        if (refreshToken) {
            const user = await User.findOne({ refreshToken });
            if (!user) {
                return res.json({
                    success: false,
                    message: 'Không tìm thấy Refresh Token',
                });
            }

            const newAccessToken = signAccessToken(user._id, user.email);
            const newRefreshToken = signRefreshToken(user._id, user.email);
            await updateUserRefreshToken(user, newRefreshToken);

            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.cookie('refresh_token', newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({
                success: true,
                message: 'Làm mới Access token',
            });
        } else {
            res.json({
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
