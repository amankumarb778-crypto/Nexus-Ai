const Analysis = require('../models/Analysis');

exports.getHistory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const analyses = await Analysis.find({ user: req.user._id })
            .populate('resume')
            .sort({ createdAt: -1 });

        const mapped = analyses.map(h => ({
            id: h._id,
            filename: h.resume?.filename || 'Unknown',
            job_role: h.jobRole,
            date: h.createdAt,
            overall_score: h.overallScore,
            ats_score: h.atsScore,
            clarity_score: h.clarityScore,
            score_history: [h.overallScore], // simplified for frontend
            keywords_missing: h.keywordsMissing,
            strengths: h.strengths,
            weaknesses: h.weaknesses
        }));

        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteHistoryItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure user owns the item
        const deleted = await Analysis.findOneAndDelete({ _id: id, user: req.user._id });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'History item not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
