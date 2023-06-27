const User = require('../models/User');
const Delivery = require('../models/Delivery');

const getAddress = async (req, res, next) => {
    if (req.id) {
        const userId = req.id;
        try {
            const delivery = await Delivery.findOne({ userId });
            if (!delivery) {
                return res.json({
                    success: false,
                    message: 'Failed',
                });
            }

            res.json({
                success: true,
                delivery,
                message: 'Get address successfully',
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({
            success: false,
            message: 'Failed',
        });
    }
};

const postAddress = async (req, res, next) => {
    if (req.id) {
        const { name, province, district, ward, address } = req.body;
        const userId = req.id;
        try {
            const newAddress = new Delivery({ userId, name, province, district, ward, address });
            await newAddress.save();

            res.json({
                success: true,
                newAddress,
                message: 'Add address successfully',
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({
            success: false,
            message: 'Failed',
        });
    }
};

const editAddress = async (req, res, next) => {
    if (req.id) {
        const { name, province, district, ward, address } = req.body;
        const userId = req.id;
        try {
            await Delivery.findOneAndUpdate(
                { userId },
                { name, province, district, ward, address }
            );

            res.json({
                success: true,
                message: 'Update address successfully',
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.json({
            success: false,
            message: 'Failed',
        });
    }
};

module.exports = {
    getAddress,
    postAddress,
    editAddress,
};
