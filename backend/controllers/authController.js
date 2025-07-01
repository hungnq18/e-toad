const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email or username already exists'
            });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password,
            fullName
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            user: user.getPublicProfile(),
            token
        });
    } catch (error) {
        console.error('REGISTRATION ERROR:', error);
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        // Set token vào cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        });

        res.json({
            message: 'Login successful',
            user: user.getPublicProfile(),
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message
        });
    }
};

// Logout user
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({
            message: 'Error logging out',
            error: error.message
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        res.json({
            user: req.user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user data',
            error: error.message
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ['fullName', 'avatar', 'email', 'phone'];
        const isValidOperation = Object.keys(updates).every(update => 
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).json({
                message: 'Invalid updates'
            });
        }

        Object.assign(req.user, updates);
        await req.user.save();

        res.json({
            message: 'Profile updated successfully',
            user: req.user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating profile',
            error: error.message
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Verify current password
        const isMatch = await req.user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Current password is incorrect'
            });
        }

        // Update password
        req.user.password = newPassword;
        await req.user.save();

        res.json({
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error changing password',
            error: error.message
        });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với email này.' });
        }
        // Tạo token reset
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1h
        await user.save();
        // Gửi email
        const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${token}`;
        await sendEmail(
            user.email,
            'Yêu cầu đặt lại mật khẩu',
            `<p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản E-Toad.</p>
            <p>Nhấn vào link sau để đặt lại mật khẩu: <a href="${resetUrl}">${resetUrl}</a></p>
            <p>Nếu không phải bạn, hãy bỏ qua email này.</p>`
        );
        res.json({ message: 'Đã gửi email hướng dẫn đặt lại mật khẩu.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi gửi email quên mật khẩu', error: error.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.json({ message: 'Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi đặt lại mật khẩu', error: error.message });
    }
}; 