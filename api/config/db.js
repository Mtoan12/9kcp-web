require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDb;
