const express = require('express');
const { getHistory, deleteHistoryItem } = require('../controllers/historyController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.get('/', protect, getHistory);
router.delete('/:id', protect, deleteHistoryItem);

module.exports = router;
