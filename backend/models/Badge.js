const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false, 
    }
}, {
    timestamps: true
});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;
