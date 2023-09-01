const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const storage = require('../storage/storage');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // console.log(file);
//         cb(null, path.join(__dirname, '../public/uploads/'));
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         console.log(fileName);
//         cb(null, uuidv4() + '-' + fileName);
//     },
// });
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});

module.exports = upload;
