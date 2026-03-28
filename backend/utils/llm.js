const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

/**
 * callLLM — Real Gemini API implementation.
 */
async function callLLM(prompt, jobRole = 'Software Engineer') {
    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            console.warn('[callLLM] Missing API Key, falling back to mock data.');
            return getMockData(jobRole);
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('[callLLM] JSON Parse Error:', parseError.message);
            // Fallback: try to find JSON in the text if it's wrapped in markdown
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response as JSON');
        }
    } catch (err) {
        console.error('[callLLM] API Error:', err.message);
        throw err;
    }
}

/**
 * Mock data fallback in case API key is missing
 */
function getMockData(jobRole) {
    const scoreBase = 70;
    return {
        overall_score: scoreBase,
        ats_score: 65,
        clarity_score: 75,
        strengths: [
            `Good match for ${jobRole} requirements`,
            'Clear technical section',
        ],
        weaknesses: [
            'Needs more quantifiable metrics',
            'Summary is a bit generic',
        ],
        ats_keywords_missing: ['CI/CD', 'System Design'],
        star_bullets: {
            'Worked on the project': 'Spearheaded project development resulting in 20% efficiency gain.'
        },
    };
}

module.exports = { callLLM };

