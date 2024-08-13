const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sliderController, categoryCreate } = require('../controllers/userController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Save file temporarily in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    cb(null, `${fileName}-${Date.now()}`);
  }
});

const uploadOptions = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },  // Limit file size to 2 MB
  fileFilter: (req, file, cb) => {
    const isValid = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype);
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type! Only .png, .jpg, and .jpeg are allowed.'));
    }
  }
});

router.post('/landingslider', uploadOptions.single('image'), sliderController);
router.get('/landingslider', sliderController);
router.post('/addcategory', categoryCreate);

module.exports = router;
