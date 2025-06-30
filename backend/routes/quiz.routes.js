const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const quizController = require('../controllers/quizController');


// Placeholder routes for quiz functionality
router.get('/', quizController.getAllQuiz);

module.exports = router; 