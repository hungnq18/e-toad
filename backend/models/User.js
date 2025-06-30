const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Badge = require('./Badge'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    avatar: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    coins: {
        type: Number,
        default: 50,
        min: 0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    badges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge'
    }],
    bio: {
        type: String,
        default: ''
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Method to get public profile (remove sensitive data)
userSchema.methods.getPublicProfile = function() {
    const { _id, username, email, fullName, avatar, phone, coins, role, isActive, lastLogin, badges, createdAt, updatedAt, bio } = this;
    return { _id, username, email, fullName, avatar, phone, coins, role, isActive, lastLogin, badges, createdAt, updatedAt, bio };
};

// Static method to add coins to a user
userSchema.statics.addCoins = async function(userId, coins) {
    const user = await this.findById(userId);
    if (!user) throw new Error('User not found');
    user.coins += coins;
    await user.save();
    return user;
};

userSchema.statics.assignBadge = async function(userId, badgeId) {
    const user = await this.findById(userId);
    if (!user) throw new Error('User not found');

    if (user.badges.includes(badgeId)) {
        throw new Error('User already has this badge');
    }

    user.badges.push(badgeId);
    await user.save();
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User; 