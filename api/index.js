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

app.set('trust proxy', true);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://kicap.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// cors
const allowedOrigins = ['https://kicap.vercel.app'];

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
        message: err.message || 'Something broke!',
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
});
