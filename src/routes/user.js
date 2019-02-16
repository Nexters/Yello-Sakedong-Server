const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", userController.user_signup);
router.post("/user", userController.user_post);

module.exports = router;