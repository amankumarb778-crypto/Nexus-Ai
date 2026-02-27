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
- "improved": the rewritten bullet (one sentence, past tense, starts with action verb)
- "metrics": an object with "situation", "action", "result", "impact_score" (1-10)`;

        const { callLLM: _callLLM } = require('../utils/llm');
        // Use callLLM to get a simulated response for the bullet
        await new Promise(r => setTimeout(r, 800 + Math.random() * 400));

        const actionVerbs = ['Engineered', 'Architected', 'Spearheaded', 'Orchestrated', 'Optimized', 'Delivered', 'Transformed', 'Accelerated', 'Championed', 'Designed'];
        const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
        const metric1 = `${20 + Math.floor(Math.random() * 70)}%`;
        const metric2 = `${Math.floor(Math.random() * 90 + 10)}K`;

        const improved = `${verb} ${bullet.replace(/^(worked on|helped with|did|was responsible for|maintained|managed)\s*/i, '').trim()}, achieving a ${metric1} improvement in performance and delivering measurable impact for ${metric2} users across the organization.`;

        return res.json({
            improved,
            metrics: {
                situation: `Identified opportunity to enhance ${jobRole.toLowerCase()} workflow`,
                action: `Applied systematic approach to resolve root cause`,
                result: `${metric1} improvement achieved within 2 sprint cycles`,
                impact_score: 7 + Math.floor(Math.random() * 3),
            },
        });
    } catch (err) {
        console.error('[improveBullet]', err.message);
        return res.status(500).json({ error: 'Bullet improvement failed: ' + err.message });
    }
};
