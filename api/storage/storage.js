const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Kicap',
        allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
    },
});

const deleteImage = (imageName) => {
    cloudinary.uploader.destroy(imageName, function (error, result) {
        if (error) {
            throw new Error(error);
        }
    });
};

module.exports = { storage, deleteImage };
