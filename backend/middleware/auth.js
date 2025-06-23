const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Lấy token từ cookie trước, nếu không có thì lấy từ header
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId, isActive: true });

        if (!user) {
            return res.status(401).json({ message: 'User not found or inactive' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Admin access required' });
            }
            next();
        });
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

// Middleware cho phép admin hoặc chính user đó
const selfOrAdmin = async (req, res, next) => {
    // Middleware auth sẽ được gọi trước
    await auth(req, res, async () => {
        // Kiểm tra nếu là admin hoặc id của user khớp với id trên URL
        if (req.user.role === 'admin' || req.user._id.toString() === req.params.id) {
            return next(); // Cho phép đi tiếp
        }
        
        // Nếu không, trả về lỗi 403 (Forbidden)
        return res.status(403).json({ message: 'Admin access required or not authorized' });
    });
};

module.exports = { auth, adminAuth, selfOrAdmin }; 