const express=require('express');
const router=express.Router();
const multer=require('multer');
const { sliderController } = require('../controllers/userController');
const FileTypes = {
    "image/png": 'png',
    "image/jpeg": 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FileTypes[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if (isValid) {
            uploadError = null;
        }

        cb(uploadError, './public/slider');  // Ensure this path exists
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FileTypes[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },  // Limit file size to 2 MB
    fileFilter: (req, file, cb) => {
        const isValid = FileTypes[file.mimetype];
        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type! Only .png, .jpg, and .jpeg are allowed.'));
        }
    }
});

router.post('/landingslider', uploadOptions.single('image'), sliderController);
router.get('/landingslider',sliderController);


module.exports=router;