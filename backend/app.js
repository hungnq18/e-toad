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

// Load environment variables based on NODE_ENV
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? '.env.production' : '.env')
});

// Load configuration based on environment
const config = require('./config/' + (process.env.NODE_ENV === 'production' ? 'production' : 'development'));

const app = express();

// Middleware
app.use(cors(config.server.cors));
app.use(express.json());
app.use(cookieParser());

// Serve static files from frontend build (chỉ cần 1 lần)
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
            await mongoose.connect(config.mongodb.uri, config.mongodb.options);
            console.log('Connected to MongoDB successfully');
            break;
        } catch (err) {
            retries++;
            console.error(`MongoDB connection attempt ${retries} failed:`, err.message);
            if (retries === maxRetries) {
                console.error('Max retries reached. Could not connect to MongoDB');
                process.exit(1);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

connectWithRetry().then(() => {
    const PORT = config.server.port;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        console.log('Frontend URL:', config.server.cors.origin);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

module.exports = app;
