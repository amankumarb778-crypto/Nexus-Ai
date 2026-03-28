const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analyzeController');
const { protect } = require('../middleware/auth');

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB
    fileFilter: (_req, file, cb) => {
        const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed'), false);
        }
    },
});

router.post('/', protect, upload.single('resume'), analyzeResume);

module.exports = router;
