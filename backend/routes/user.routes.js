const express = require('express');
const router = express.Router();
const { auth, adminAuth, selfOrAdmin } = require('../middleware/auth');
const User = require('../models/User');
const upload = require('../middleware/upload');

// Get all users (admin only)
router.get('/', adminAuth, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update user (admin hoặc chính user đó)
router.patch('/:id', selfOrAdmin, upload.single('avatar'), async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'email', 'fullName', 'role', 'isActive', 'phone', 'bio', 'coins'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        updates.forEach(update => user[update] = req.body[update]);
        if (req.file && req.file.path) {
            user.avatar = req.file.path; // URL Cloudinary
        }
        await user.save();

        res.json(user.getPublicProfile());
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Add coins to user
router.post('/:id/add-coins', auth, async (req, res) => {
    try {
        const { coins } = req.body;
        
        if (!coins || coins <= 0) {
            return res.status(400).json({ message: 'Invalid coin amount' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is updating their own coins or is admin
        if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this user' });
        }

        user.coins += coins;
        await user.save();

        res.json({
            message: 'Coins added successfully',
            user: user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding coins', error: error.message });
    }
});

// Delete user (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router; 