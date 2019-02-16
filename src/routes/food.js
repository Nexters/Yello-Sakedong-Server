const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food');
const checkAuth = require('../middleware/check-auth');


router.post("/", checkAuth, foodController.food_add);

module.exports = router;
