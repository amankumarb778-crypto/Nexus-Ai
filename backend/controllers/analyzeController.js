const { PDFParse } = require('pdf-parse');
const { callLLM } = require('../utils/llm');

exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Please attach a resume.' });
        }

        const jobRole = (req.body.jobRole || 'Software Engineer').trim();
        let resumeText = '';

        // Extract text based on file type
        if (req.file.mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: req.file.buffer });
            try {
                const parsed = await parser.getText();
                resumeText = parsed.text;
            } finally {
                await parser.destroy();
            }
        } else {
            // DOCX – in production use mammoth; for now extract raw text from buffer
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
7) star_bullets (object mapping original bullet text to improved STAR-method version with quantifiable metrics)

Resume text:
${resumeText.slice(0, 6000)}`;

        const analysis = await callLLM(systemPrompt, jobRole);

        return res.json(analysis);
    } catch (err) {
        console.error('[analyzeResume]', err.message);
        return res.status(500).json({ error: 'Analysis failed: ' + err.message });
    }
};
