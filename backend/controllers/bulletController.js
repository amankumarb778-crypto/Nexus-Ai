const { callLLM } = require('../utils/llm');

exports.improveBullet = async (req, res) => {
    const { bullet, jobRole = 'Software Engineer' } = req.body;

    if (!bullet || bullet.trim().length < 5) {
        return res.status(400).json({ error: 'Please provide a bullet point to improve.' });
    }

    try {
        const prompt = `You are an expert resume writer specializing in the STAR method.
Rewrite the following resume bullet point for a ${jobRole} role.
Apply the STAR method: add a quantifiable Situation, Task, Action, and Result.
Use strong action verbs and include metrics where possible.

Original: "${bullet.trim()}"

Return ONLY a JSON object with:
{
  "improved": "the rewritten bullet (one sentence, past tense, starts with action verb)",
  "metrics": {
    "situation": "...",
    "action": "...",
    "result": "...",
    "impact_score": 1-10
  }
}`;

        const analysis = await callLLM(prompt, jobRole);
        return res.json(analysis);

    } catch (err) {
        console.error('[improveBullet]', err.message);
        return res.status(500).json({ error: 'Bullet improvement failed: ' + err.message });
    }
};

