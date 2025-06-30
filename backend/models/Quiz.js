const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
    },
    options: [{
        id: Number,
        text: String,
        isCorrect: Boolean
    }],
    explanation: {
        type: String,
        required: false
    },
    timeLimit: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: false,
        default: 'Easy'
    },
}, {
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
