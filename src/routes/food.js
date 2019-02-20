const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food');
const checkAuth = require('../middleware/check-auth');


router.post("/", checkAuth, foodController.food_add);
router.post("/comment", checkAuth, foodController.comment_add);

module.exports = router;
