const pdf = require('pdf-parse');
const { callLLM } = require('../utils/llm');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');

exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Please attach a resume.' });
        }

        const jobRole = (req.body.jobRole || 'Software Engineer').trim();
        let resumeText = '';

        // Extract text based on file type
        if (req.file.mimetype === 'application/pdf') {
            try {
                const data = await pdf(req.file.buffer);
                resumeText = data.text;
            } catch (pdfError) {
                console.error('PDF parsing error:', pdfError.message);
                return res.status(422).json({ error: 'Failed to parse PDF file. It might be corrupted or protected.' });
            }
        } else {
            // DOCX or other - fallback to buffer string
            resumeText = req.file.buffer.toString('utf-8', 0, Math.min(req.file.buffer.length, 8000));
        }

        if (!resumeText || resumeText.trim().length < 50) {
            return res.status(422).json({ error: 'Could not extract readable text from the resume. Please ensure the file is not scanned or image-based.' });
        }

        const systemPrompt = `You are an Expert Technical Recruiter. Analyze the resume text for a ${jobRole}. 
You MUST return a JSON object ONLY with:
1) overall_score (1-100)
2) ats_score (1-100) 
3) clarity_score (1-100)
4) strengths (array of strings)
5) weaknesses (array of strings)
6) ats_keywords_missing (array of strings)
7) star_bullets (object mapping original bullet text to improved STAR-method version)

Resume text:
${resumeText.slice(0, 6000)}`;

        const analysisResult = await callLLM(systemPrompt, jobRole);

        // Save Resume to DB
        const resumeDocument = await Resume.create({
            user: req.user._id,
            filename: req.file.originalname,
            text: resumeText,
            jobRole: jobRole
        });

        // Save Analysis to DB
        const analysisDocument = await Analysis.create({
            user: req.user._id,
            resume: resumeDocument._id,
            jobRole: jobRole,
            overallScore: analysisResult.overall_score,
            atsScore: analysisResult.ats_score,
            clarityScore: analysisResult.clarity_score,
            strengths: analysisResult.strengths,
            weaknesses: analysisResult.weaknesses,
            keywordsMissing: analysisResult.ats_keywords_missing,
            starBullets: analysisResult.star_bullets
        });

        return res.json({
            ...analysisResult,
            analysisId: analysisDocument._id
        });
    } catch (err) {
        console.error('[analyzeResume]', err.message);
        return res.status(500).json({ error: 'Analysis failed: ' + err.message });
    }
};
