const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user.routes');
const quizRoutes = require('./routes/quiz.routes');
const blogRoutes = require('./routes/blog.routes');
const coinPackageRoutes = require('./routes/coinPackage.routes');
const productRoutes = require('./routes/product.routes');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from frontend build (production only)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    // Security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/coin-packages', coinPackageRoutes);
app.use('/api/products', productRoutes);

// SPA fallback: trả về index.html cho mọi route không phải API
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        if (req.url.startsWith('/api/')) return res.status(404).json({ message: 'API not found' });
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof mongoose.Error) {
        return res.status(400).json({
            message: 'Database operation failed',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Database error'
        });
    }
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.stack : 'Internal server error'
    });
});

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/etoad';
            await mongoose.connect(mongoUri);
            break;
        } catch (err) {
            retries++;
            if (retries === maxRetries) {
                console.error('Max retries reached. Could not connect to MongoDB');
                process.exit(1);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

connectWithRetry().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

app.use('/uploads', require('express').static('uploads'));

module.exports = app;
