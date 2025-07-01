const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const badgeController = require('../controllers/badgeController');


// Placeholder routes for quiz functionality
router.get('/', badgeController.getAllBadges);
router.post('/add-badge-for-user', auth, badgeController.addBadgeForUser);
router.get('/get-badge',auth, badgeController.getBadgesForUser);


module.exports = router; 