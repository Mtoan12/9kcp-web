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

// cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Cho phép gửi cookie cùng với yêu cầu
};
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
