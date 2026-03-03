import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Zap, Upload, LayoutDashboard, Lightbulb,
    Sparkles, History, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { to: '/', label: 'Home', icon: Zap },
    { to: '/upload', label: 'Upload', icon: Upload },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/suggestions', label: 'AI Fixes', icon: Lightbulb },
    { to: '/bullet', label: 'Bullet Pro', icon: Sparkles },
    { to: '/history', label: 'History', icon: History },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <nav className="mt-3 glass-card px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-glow-cyan">
                            <Zap size={16} className="text-navy-900 fill-navy-900" />
                        </div>
                        <span className="font-bold text-base tracking-tight">
                            <span className="text-gradient-cyan">Nexus</span>
                            <span className="text-nexus-text"> AI</span>
                        </span>
                    </NavLink>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                <Icon size={14} />
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-nexus-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            AI Online
                        </div>
                        <NavLink to="/upload" className="btn-primary text-xs py-2 px-4">
                            Analyze Resume
                        </NavLink>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden btn-ghost p-2"
                        onClick={() => setOpen(o => !o)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </nav>

                {/* Mobile menu */}
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-2 glass-card px-4 py-3 flex flex-col gap-1 md:hidden"
                    >
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={14} />
                                {label}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </div>
        </header>
    );
}
