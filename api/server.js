require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDb = require('./config/db.js');
const authRoute = require('./routes/auth.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();

app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        success: false,
        message: 'Something broke!',
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
});
