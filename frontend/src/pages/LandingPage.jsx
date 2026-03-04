import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Zap, ArrowRight, Play, Shield, Brain, TrendingUp,
    CheckCircle, Star, ChevronRight, X
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import DemoVideoPlayer from '../components/DemoVideoPlayer';

const features = [
    { icon: Brain, color: 'from-cyan-500 to-teal-500', label: 'AI-Powered Analysis', desc: 'Deep NLP analysis against modern hiring algorithms and ATS systems' },
    { icon: Shield, color: 'from-indigo-500 to-violet-500', label: 'ATS Optimization', desc: 'Match keywords and structure for leading applicant tracking software' },
    { icon: TrendingUp, color: 'from-amber-500 to-orange-500', label: 'Score Improvement', desc: 'Track resume performance across iterations with a visual timeline' },
];

const stats = [
    { value: '94%', label: 'Interview Rate Boost' },
    { value: '2.4×', label: 'More Callbacks' },
    { value: '50K+', label: 'Resumes Optimized' },
    { value: '3 sec', label: 'Avg Analysis Time' },
];

const ticker = ['KEYWORD EXTRACTION', 'ATS MATCHING', 'STAR BULLETS', 'CLARITY SCORE', 'IMPACT ANALYSIS'];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function LandingPage() {
    const [showDemo, setShowDemo] = useState(false);
    const [playing, setPlaying] = useState(false);

    // Reset playing state when closing modal
    const closeDemo = () => {
        setShowDemo(false);
        setTimeout(() => setPlaying(false), 300); // wait for exit animation
    };

    return (
        <PageWrapper>
            {/* ── Hero ── */}
            <section className="relative flex flex-col items-center text-center pt-8 pb-20">
                {/* Background glow blobs */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
                />
                <div className="absolute top-20 right-8 w-[400px] h-[400px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)' }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="badge-cyan mb-6"
                >
                    <Zap size={11} className="fill-cyan-400 text-cyan-400" />
                    AI-Powered Resume Intelligence
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-balance max-w-5xl"
                >
                    FORGET THE RESUME.
                    <br />
                    <span className="text-gradient-full">DEMAND THE INTERVIEW.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                    className="mt-6 max-w-xl text-base sm:text-lg text-nexus-muted leading-relaxed"
                >
                    Nexus AI analyzes your resume with enterprise-grade intelligence —
                    surfacing keyword gaps, ATS score, clarity metrics, and STAR-method
                    bullet improvements in under 3 seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.38 }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    <Link to="/upload" className="btn-primary text-sm py-3.5 px-8 shadow-glow-cyan">
                        Get Started Free
                        <ArrowRight size={16} />
                    </Link>
                    <button onClick={() => setShowDemo(true)} className="btn-secondary text-sm py-3.5 px-8 group">
                        <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 transition-all">
                            <Play size={11} className="text-nexus-cyan ml-0.5 fill-nexus-cyan" />
                        </span>
                        Watch Demo
                    </button>
                </motion.div>

                {/* Ticker tape */}
                <div className="mt-16 w-full overflow-hidden">
                    <div className="flex gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                        {[...ticker, ...ticker, ...ticker].map((t, i) => (
                            <span key={i} className="text-xs font-semibold text-nexus-muted/50 tracking-[0.3em] uppercase shrink-0">
                                {t}
                                <span className="ml-8 text-cyan-500/40">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
            >
                {stats.map(({ value, label }) => (
                    <motion.div key={label} variants={itemVariants} className="glass-card p-6 text-center group hover:border-cyan-500/20 transition-colors">
                        <div className="text-3xl font-black text-gradient-cyan">{value}</div>
                        <div className="text-xs text-nexus-muted mt-1 font-medium">{label}</div>
                    </motion.div>
                ))}
            </motion.section>

            {/* ── Features ── */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-20"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gradient-indigo mb-3">
                        Intelligence Stack
                    </h2>
                    <p className="text-nexus-muted max-w-lg mx-auto text-sm leading-relaxed">
                        Enterprise-grade AI tools, purpose-built to transform your resume from good to irresistible.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {features.map(({ icon: Icon, color, label, desc }) => (
                        <motion.div key={label} variants={itemVariants}
                            className="glass-card p-6 group hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1 cursor-default"
                        >
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                                <Icon size={20} className="text-white" />
                            </div>
                            <h3 className="font-bold text-nexus-text mb-2">{label}</h3>
                            <p className="text-sm text-nexus-muted leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── How it works ── */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-20"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-nexus-text mb-3">
                        Three Steps to <span className="text-gradient-cyan">Interview-Ready</span>
                    </h2>
                </motion.div>
                <div className="grid sm:grid-cols-3 gap-8 relative">
                    {/* Connector line */}
                    <div className="hidden sm:block absolute top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-transparent" />
                    {[
                        { step: '01', title: 'Upload Resume', desc: 'Drop your PDF or DOCX — we handle parsing instantly' },
                        { step: '02', title: 'AI Deep Analysis', desc: 'Our engine scores ATS compatibility, clarity, and impact' },
                        { step: '03', title: 'Collect Interviews', desc: 'Apply with confidence using your optimized, interview-ready resume' },
                    ].map(({ step, title, desc }) => (
                        <motion.div key={step} variants={itemVariants} className="flex flex-col items-center text-center gap-3">
                            <div className="w-14 h-14 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                                <span className="text-lg font-black text-gradient-cyan">{step}</span>
                            </div>
                            <h4 className="font-bold text-nexus-text">{title}</h4>
                            <p className="text-sm text-nexus-muted">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── CTA Banner ── */}
            <motion.section
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-10 sm:p-14 text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-indigo-500/5 to-violet-500/5" />
                <Star size={42} className="mx-auto text-amber-400 mb-4" />
                <h2 className="text-3xl sm:text-4xl font-black text-nexus-text mb-4">
                    Ready to <span className="text-gradient-full">land your dream role?</span>
                </h2>
                <p className="text-nexus-muted mb-8 max-w-md mx-auto text-sm">
                    Join 50,000+ professionals who use Nexus AI to turn rejections into callbacks.
                </p>
                <Link to="/upload" className="btn-primary mx-auto text-base py-4 px-10">
                    Analyze My Resume Now
                    <ChevronRight size={18} />
                </Link>

                {/* Trust pills */}
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                    {['No signup required', 'ATS-tested', 'GDPR compliant'].map(t => (
                        <span key={t} className="flex items-center gap-1.5 text-xs text-nexus-muted">
                            <CheckCircle size={12} className="text-emerald-400" />
                            {t}
                        </span>
                    ))}
                </div>
            </motion.section>

            {createPortal(
                <AnimatePresence>
                    {showDemo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDemo(false)}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden glass-card border border-cyan-500/20 shadow-glow-cyan bg-[#0f172a]"
                            >
                                <button
                                    onClick={closeDemo}
                                    className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white transition-colors backdrop-blur-md"
                                >
                                    <X size={20} />
                                </button>

                                {playing ? (
                                    <div className="absolute inset-0">
                                        <DemoVideoPlayer />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-navy-950 flex flex-col items-center justify-center">
                                        {/* Video Poster Image */}
                                        <div className="absolute inset-0 opacity-40">
                                            <img src="/demo-poster.png" alt="Nexus AI Demo" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />
                                        </div>

                                        {/* Play Button Interface */}
                                        <div
                                            onClick={() => setPlaying(true)}
                                            className="relative flex flex-col items-center z-10 group cursor-pointer transition-transform hover:scale-105"
                                        >
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cyan-500/20 shadow-glow-cyan border border-cyan-400/30 flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 group-hover:border-cyan-400/50 transition-all">
                                                <Play size={48} className="text-cyan-400 fill-cyan-400 ml-3 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-lg">Platform Overview</h3>
                                            <p className="text-cyan-400 font-mono text-sm tracking-widest bg-navy-900/80 px-4 py-1.5 rounded-full border border-cyan-500/20 shadow-xl">
                                                2 MINUTE TOUR
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
        </PageWrapper>
    );
}
