const express = require('express');
const router = express.Router();

const outputController = require('../controllers/output');
const checkAuth = require('../middleware/check-auth');

router.get("/output", outputController.output);

module.exports = router;