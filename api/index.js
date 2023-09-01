require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db.js');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth.js');
const productRoute = require('./routes/product.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require('./routes/order.js');
const deliveryRoute = require('./routes/delivery.js');
const commentRoute = require('./routes/comment.js');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', true);
}

// cors
const allowedOrigins = ['https://kicap.vercel.app', 'http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use(cookieParser());

connectDb();

app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/delivery', deliveryRoute);
app.use('/api/comment', commentRoute);



app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.code || 500).json({
        success: false,
        message: err.message || 'Lỗi không xác đinh',
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
});
