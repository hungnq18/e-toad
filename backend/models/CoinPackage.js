const mongoose = require('mongoose');

const coinPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Package name is required'],
        trim: true
    },
    coins: {
        type: Number,
        required: [true, 'Number of coins is required'],
        min: [1, 'Coins must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        required: [true, 'Original price is required'],
        min: [0, 'Original price cannot be negative']
    },
    discount: {
        type: String,
        required: [true, 'Discount percentage is required'],
        trim: true
    },
    popular: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for calculating discount percentage
coinPackageSchema.virtual('discountPercentage').get(function() {
    if (this.originalPrice === 0) return 0;
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Method to get public data
coinPackageSchema.methods.getPublicData = function() {
    const packageObject = this.toObject();
    delete packageObject.__v;
    return packageObject;
};

const CoinPackage = mongoose.model('CoinPackage', coinPackageSchema);

module.exports = CoinPackage; 