require('dotenv').config(); // Load environment vars at the very top
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const analyzeRoutes = require('./routes/analyze');
const bulletRoutes = require('./routes/bullet');
const historyRoutes = require('./routes/history');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Database Connectivity: Connection heartbeat & retry logic
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('🔄 Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};
connectDB();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'] }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Robust Security: Security Headers & Rate Limiting
app.use(helmet()); // Automatically set secure HTTP headers

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Observability and Performance: Structured logging
app.use(morgan('combined')); // Comprehensive production logging

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/analyze', analyzeRoutes);
app.use('/api/improve-bullet', bulletRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/auth', authRoutes);

// ── System Status ───────────────────────────────────────────────────────────
app.get('/api/status', (_req, res) => {
    res.json({
        app: 'Nexus AI Resume Optimizer',
        status: 'Operational',
        ready: true,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} -`, err.message);

    // Provide stack trace only in development
    const response = process.env.NODE_ENV === 'production'
        ? { error: err.message || 'Internal server error' }
        : { error: err.message || 'Internal server error', stack: err.stack };

    res.status(err.status || 500).json(response);
});

const server = app.listen(PORT, () => {
    console.log(`\n🚀 Nexus AI Resume Optimizer is LIVE at http://localhost:${PORT}`);
    console.log(`   Status: http://localhost:${PORT}/api/status\n`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.error(`💡 Try running: taskkill /F /PID <PID> (find PID with 'netstat -ano | findstr :${PORT}')`);
    } else {
        console.error('❌ Server error:', err.message);
    }
});
