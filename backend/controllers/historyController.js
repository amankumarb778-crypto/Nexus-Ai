// In-memory mock database of past resume analyses
const mockHistory = [
    {
        id: 'h001',
        filename: 'Alex_Resume_v3.pdf',
        job_role: 'Senior Software Engineer',
        date: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
        overall_score: 84,
        ats_score: 79,
        clarity_score: 91,
        score_history: [58, 67, 74, 84],
        keywords_missing: ['Kubernetes', 'system design', 'code review'],
    },
    {
        id: 'h002',
        filename: 'Alex_Resume_v2.pdf',
        job_role: 'Senior Software Engineer',
        date: new Date(Date.now() - 9 * 24 * 3600000).toISOString(),
        overall_score: 74,
        ats_score: 68,
        clarity_score: 80,
        score_history: [58, 67, 74],
        keywords_missing: ['Kubernetes', 'CI/CD', 'TDD', 'microservices'],
    },
    {
        id: 'h003',
        filename: 'Alex_Resume_v1.pdf',
        job_role: 'Software Engineer',
        date: new Date(Date.now() - 16 * 24 * 3600000).toISOString(),
        overall_score: 58,
        ats_score: 51,
        clarity_score: 63,
        score_history: [58],
        keywords_missing: ['REST API', 'CI/CD', 'TDD', 'agile', 'Kubernetes', 'system design'],
    },
    {
        id: 'h004',
        filename: 'Marketing_Resume_Draft.pdf',
        job_role: 'Product Manager',
        date: new Date(Date.now() - 30 * 24 * 3600000).toISOString(),
        overall_score: 67,
        ats_score: 72,
        clarity_score: 70,
        score_history: [45, 58, 67],
        keywords_missing: ['OKRs', 'PRD', 'go-to-market', 'user research'],
    },
    {
        id: 'h005',
        filename: 'DS_Resume_Final.docx',
        job_role: 'Data Scientist',
        date: new Date(Date.now() - 45 * 24 * 3600000).toISOString(),
        overall_score: 91,
        ats_score: 88,
        clarity_score: 94,
        score_history: [62, 71, 80, 87, 91],
        keywords_missing: ['MLflow'],
    },
];

exports.getHistory = (_req, res) => {
    // Return sorted newest-first
    const sorted = [...mockHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sorted);
};
