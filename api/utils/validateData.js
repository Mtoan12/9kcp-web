const mongoose = require('mongoose');

const isObjectIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
};

// Kiểm tra tính hợp lệ của mật khẩu
const isValidPassword = (password) => {
    return password.length >= 8;
};

module.exports = { isObjectIdValid, isValidEmail, isValidPassword };
