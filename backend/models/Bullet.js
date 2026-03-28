const mongoose = require('mongoose');

const bulletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    originalText: {
        type: String,
        required: true
    },
    improvedText: {
        type: String,
        required: true
    },
    metrics: {
        situation: String,
        action: String,
        result: String,
        impactScore: Number
    },
    jobRole: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bullet', bulletSchema);
