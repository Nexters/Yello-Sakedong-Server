const express = require('express');
const router = express.Router();
const multer = require('multer');
const mimetype = require('mime-types');

const foodController = require('../controllers/food');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.get("/", checkAuth, foodController.food_list);

router.post("/", checkAuth, upload.single('foodImageUrl'), foodController.food_add);

module.exports = router;
