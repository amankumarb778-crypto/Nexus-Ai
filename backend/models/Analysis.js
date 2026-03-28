const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    overallScore: {
        type: Number,
        required: true
    },
    atsScore: {
        type: Number,
        required: true
    },
    clarityScore: {
        type: Number,
        required: true
    },
    strengths: [String],
    weaknesses: [String],
    keywordsMissing: [String],
    starBullets: {
        type: mongoose.Schema.Types.Mixed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analysis', analysisSchema);


