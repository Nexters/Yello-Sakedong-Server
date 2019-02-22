const express = require('express');
const router = express.Router();

const outputController = require('../controllers/output');
const checkAuth = require('../middleware/check-auth');

router.get("/",checkAuth, outputController.output);
router.get("/comments", checkAuth, outputController.comments);

module.exports = router;