import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp, Target, Eye, Zap, Key, ArrowRight,
    CheckCircle, AlertTriangle, BarChart3, Lightbulb
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import ScoreRing from '../components/ScoreRing';
import { useResume } from '../context/ResumeContext';

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function DashboardPage() {
    const navigate = useNavigate();
    const { analysisResult, jobRole } = useResume();

    useEffect(() => {
        if (!analysisResult) navigate('/upload');
    }, [analysisResult, navigate]);

    if (!analysisResult) return null;

    const {
        overall_score = 72,
        ats_score = 68,
        clarity_score = 81,
        strengths = [],
        weaknesses = [],
        ats_keywords_missing = [],
        star_bullets = {},
    } = analysisResult;

    const scoreColor = overall_score >= 80 ? 'emerald' : overall_score >= 60 ? 'amber' : 'rose';
    const scoreLabel = overall_score >= 80 ? 'Excellent' : overall_score >= 60 ? 'Good — Room to grow' : 'Needs Work';
    const scoreBadgeClass = overall_score >= 80 ? 'badge-emerald' : overall_score >= 60 ? 'badge-amber' : 'badge bg-rose-500/20 text-rose-300 border-rose-500/30';

    return (
        <PageWrapper>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
                <div>
                    <span className="badge-indigo mb-3 inline-flex">
                        <BarChart3 size={11} /> Analysis Dashboard
                    </span>
                    <h1 className="text-3xl font-black text-nexus-text">
                        Resume <span className="text-gradient-cyan">Intelligence Report</span>
                    </h1>
                    <p className="text-nexus-muted text-sm mt-1">
                        Analyzed for <span className="text-nexus-cyan font-medium">{jobRole}</span> · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/suggestions" className="btn-primary text-sm">
                        View AI Fixes <ArrowRight size={14} />
                    </Link>
                    <Link to="/upload" className="btn-secondary text-sm">
                        Re-upload
                    </Link>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid lg:grid-cols-12 gap-5"
            >
                {/* ── Score Rings Card ── col-span-5 */}
                <motion.div variants={cardVariants} className="lg:col-span-5 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-nexus-text">Performance Scores</h2>
                        <span className={scoreBadgeClass}>{scoreLabel}</span>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-around">
                        <ScoreRing score={overall_score} label="Overall Score" color={scoreColor} size={148} thickness={12} />
                        <ScoreRing score={ats_score} label="ATS Match" color="indigo" size={120} thickness={10} />
                        <ScoreRing score={clarity_score} label="Clarity" color="cyan" size={120} thickness={10} />
                    </div>

                    {/* Score legend */}
                    <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
                        {[
                            { label: 'Overall Score', val: overall_score, color: 'text-emerald-400' },
                            { label: 'ATS Match', val: ats_score, color: 'text-indigo-400' },
                            { label: 'Clarity', val: clarity_score, color: 'text-cyan-400' },
                        ].map(({ label, val, color }) => (
                            <div key={label}>
                                <div className={`text-xl font-black ${color}`}>{val}</div>
                                <div className="text-xs text-nexus-muted mt-0.5">{label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Strengths ── col-span-4 */}
                <motion.div variants={cardVariants} className="lg:col-span-4 glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                            <TrendingUp size={14} className="text-emerald-400" />
                        </div>
                        <h2 className="font-bold text-nexus-text">Performance Strengths</h2>
                    </div>
                    <div className="space-y-3">
                        {strengths.length > 0 ? strengths.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.07 }}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15"
                            >
                                <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-nexus-text leading-snug">{s}</p>
                            </motion.div>
                        )) : (
                            <p className="text-nexus-muted text-sm">Upload a resume to see strengths.</p>
                        )}
                    </div>
                </motion.div>

                {/* ── Weaknesses ── col-span-3 */}
                <motion.div variants={cardVariants} className="lg:col-span-3 glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center border border-amber-500/25">
                            <AlertTriangle size={14} className="text-amber-400" />
                        </div>
                        <h2 className="font-bold text-nexus-text">Optimized Weaknesses</h2>
                    </div>
                    <div className="space-y-3">
                        {weaknesses.length > 0 ? weaknesses.map((w, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.07 }}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15"
                            >
                                <AlertTriangle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-nexus-text leading-snug">{w}</p>
                            </motion.div>
                        )) : (
                            <p className="text-nexus-muted text-sm">No critical weaknesses found!</p>
                        )}
                    </div>
                </motion.div>

                {/* ── Missing ATS Keywords ── col-span-5 */}
                <motion.div variants={cardVariants} className="lg:col-span-5 glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-rose-500/15 flex items-center justify-center border border-rose-500/25">
                            <Key size={14} className="text-rose-400" />
                        </div>
                        <h2 className="font-bold text-nexus-text">Missing ATS Keywords</h2>
                        <span className="ml-auto badge bg-rose-500/15 text-rose-300 border-rose-500/25 text-[10px]">
                            {ats_keywords_missing.length} gaps
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {ats_keywords_missing.length > 0 ? ats_keywords_missing.map((kw, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.04 }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/8 border border-rose-500/20 text-rose-300 text-xs font-mono font-medium"
                            >
                                {kw}
                            </motion.span>
                        )) : (
                            <p className="text-emerald-400 text-sm flex items-center gap-2">
                                <CheckCircle size={14} /> All key ATS terms present!
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* ── Quick Metrics ── col-span-7 */}
                <motion.div variants={cardVariants} className="lg:col-span-7 glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center border border-indigo-500/25">
                            <Lightbulb size={14} className="text-indigo-400" />
                        </div>
                        <h2 className="font-bold text-nexus-text">Next Steps</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            { icon: Lightbulb, label: 'View AI Suggestions', desc: 'Actionable fixes ranked by impact', to: '/suggestions', color: 'from-indigo-500 to-violet-500' },
                            { icon: Zap, label: 'Bullet Improver', desc: 'STAR-method bullet rewriting', to: '/bullet', color: 'from-cyan-500 to-teal-500' },
                            { icon: Target, label: 'ATS Deep Dive', desc: `${ats_keywords_missing.length} keywords to add`, to: '/suggestions', color: 'from-rose-500 to-pink-500' },
                            { icon: Eye, label: 'View History', desc: 'Track score improvements', to: '/history', color: 'from-amber-500 to-orange-500' },
                        ].map(({ icon: Icon, label, desc, to, color }) => (
                            <Link
                                key={label} to={to}
                                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/3 border border-white/5 
                           hover:bg-white/6 hover:border-white/10 transition-all group"
                            >
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <Icon size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-nexus-text">{label}</p>
                                    <p className="text-xs text-nexus-muted">{desc}</p>
                                </div>
                                <ArrowRight size={14} className="ml-auto text-nexus-muted group-hover:text-nexus-cyan transition-colors" />
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </PageWrapper>
    );
}
