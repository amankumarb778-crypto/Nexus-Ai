const express = require('express');
const { improveBullet } = require('../controllers/bulletController');

const router = express.Router();
router.post('/', improveBullet);
module.exports = router;
