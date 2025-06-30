const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoinPackage',
        required: true
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    orderCode: {
        type: Number,
        unique: true,
        sparse: true // Allow null/undefined values
    },
    amount: {
        type: Number,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'payos'],
        default: 'cod'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'failed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'],
        default: 'unpaid'
    },
    paymentUrl: {
        type: String
    },
    transactionId: {
        type: String
    },
    notes: {
        type: String,
        default: ''
    },
    paidAt: {
        type: Date
    },
    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Generate order number
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        console.log('Creating new order with payment method:', this.paymentMethod);
        
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Get count of orders today
        const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        
        const count = await this.constructor.countDocuments({
            createdAt: { $gte: todayStart, $lt: todayEnd }
        });
        
        // Tạo prefix dựa trên payment method
        const prefix = this.paymentMethod === 'payos' ? 'PAY' : 'COD';
        this.orderNumber = `${prefix}${year}${month}${day}${String(count + 1).padStart(4, '0')}`;
        
        console.log('Generated order number:', this.orderNumber);
    }
    next();
});

// Get public data
orderSchema.methods.getPublicData = function() {
    return {
        _id: this._id,
        orderNumber: this.orderNumber,
        orderCode: this.orderCode,
        amount: this.amount,
        coins: this.coins,
        paymentMethod: this.paymentMethod,
        status: this.status,
        paymentStatus: this.paymentStatus,
        paymentUrl: this.paymentUrl,
        transactionId: this.transactionId,
        notes: this.notes,
        createdAt: this.createdAt,
        paidAt: this.paidAt,
        confirmedAt: this.confirmedAt
    };
};

module.exports = mongoose.model('Order', orderSchema); 