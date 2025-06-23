const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        });

        res.json({
            message: 'Login successful',
            user: user.getPublicProfile()
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