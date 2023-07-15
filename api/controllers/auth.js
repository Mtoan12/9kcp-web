require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

        const accessToken = jwt.sign(
            { userId: newUser._id, email },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.status(201).json({
            success: true,
            message: 'Tạo tài khoản thành công',
            accessToken,
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

        const accessToken = jwt.sign({ userId: user._id, email }, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            accessToken,
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

module.exports = {
    register,
    login,
    loadUser,
};
