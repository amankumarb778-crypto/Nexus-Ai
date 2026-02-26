/**
 * callLLM — AI Orchestration placeholder.
 * Swap the body with a real Gemini / OpenAI call in production.
 *
 * System prompt sent to LLM:
 * "You are an Expert Technical Recruiter. Analyze the resume text for a [Job Role].
 *  You MUST return a JSON object ONLY with:
 *  1) overall_score (1-100)
 *  2) strengths (array)
 *  3) weaknesses (array)
 *  4) ats_keywords_missing (array)
 *  5) star_bullets (mapping original text to improved versions with quantifiable metrics)"
 */
async function callLLM(prompt, jobRole = 'Software Engineer') {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));

    const scoreBase = 55 + Math.floor(Math.random() * 35);

    return {
        overall_score: scoreBase,
        ats_score: Math.max(40, scoreBase - 5 + Math.floor(Math.random() * 14)),
        clarity_score: Math.min(99, scoreBase + 2 + Math.floor(Math.random() * 18)),
        strengths: [
            `Demonstrates clear progression from junior to senior ${jobRole} roles`,
            'Quantified achievements with business impact metrics stand out',
            'Strong technical stack alignment with modern industry standards',
            'Consistent use of action verbs and active voice throughout',
        ],
        weaknesses: [
            `Missing critical ${jobRole}-specific ATS keywords that recruiters filter for`,
            'Several bullet points lack quantifiable outcomes or metrics',
            'Summary section is generic — needs role-specific value proposition',
            'Education section placement reduces scannability for senior roles',
        ],
        ats_keywords_missing: getKeywordsForRole(jobRole),
        star_bullets: {
            'Worked on the website front-end':
                `Led front-end development of customer-facing web application serving 50K+ monthly active users, reducing page load time by 40% and increasing conversion rate by 12% through React performance optimizations.`,
            'Helped with customer support':
                `Resolved 95% of tier-2 customer escalations within SLA, supporting a portfolio of 200+ enterprise accounts and driving a 28-point NPS improvement quarter-over-quarter.`,
            'Maintained the database':
                `Architected and maintained PostgreSQL database serving 5M+ records, implementing query optimization strategies that reduced average response times by 65% and eliminated 3 critical production incidents.`,
        },
    };
}

function getKeywordsForRole(role) {
    const map = {
        'Software Engineer': ['CI/CD', 'Kubernetes', 'microservices', 'REST API', 'TDD', 'system design', 'code review', 'agile'],
        'Data Scientist': ['PyTorch', 'MLflow', 'feature engineering', 'A/B testing', 'SQL', 'model deployment', 'statistical analysis'],
        'Product Manager': ['OKRs', 'roadmap', 'stakeholder alignment', 'user research', 'PRD', 'go-to-market', 'KPI'],
        'DevOps Engineer': ['Terraform', 'Kubernetes', 'Helm', 'GitOps', 'SRE', 'observability', 'incident response'],
        'Machine Learning Engineer': ['MLOps', 'feature store', 'model serving', 'distributed training', 'ONNX', 'Triton'],
        'Frontend Developer': ['React', 'TypeScript', 'Web Vitals', 'accessibility (a11y)', 'SSR', 'bundle optimization', 'design systems'],
        'Backend Developer': ['gRPC', 'message queues', 'caching strategy', 'database optimization', 'API gateway', 'distributed systems'],
    };
    return map[role] || ['leadership', 'cross-functional', 'data-driven', 'scalable', 'agile', 'mentorship'];
}

module.exports = { callLLM };
