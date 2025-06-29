const express = require('express');
const router = express.Router();
const coinPackageController = require('../controllers/CoinPackageController');
const { auth } = require('../middleware/auth');

// Public routes
router.get('/', coinPackageController.getAllPackages);

// Protected routes (require authentication) - specific routes first
router.get('/user/balance', auth, coinPackageController.getUserBalance);
router.post('/purchase', auth, coinPackageController.purchasePackage);

// Admin routes (require authentication)
router.post('/', auth, coinPackageController.createPackage);

// Parameter routes (must come after specific routes)
router.get('/:id', coinPackageController.getPackageById);
router.put('/:id', auth, coinPackageController.updatePackage);
router.delete('/:id', auth, coinPackageController.deletePackage);

module.exports = router; 