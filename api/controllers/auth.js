require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
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
        console.log(error);
    }
};

const login = async (req, res) => {
    
};

module.exports = {
    register,
    login,
};
