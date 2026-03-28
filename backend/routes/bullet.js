const express = require('express');
const { improveBullet } = require('../controllers/bulletController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.post('/', protect, improveBullet);
module.exports = router;
