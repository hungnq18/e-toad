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

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/blogs', blogRoutes);

// Catch-all: Trả về index.html cho mọi route không phải API
// Luôn đặt ở cuối cùng
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Log environment variables to check if they are loaded
console.log('--- Environment Variables ---');
console.log('MONGODB_URI loaded:', !!process.env.MONGODB_URI);
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
console.log('---------------------------');

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
