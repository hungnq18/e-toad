const express = require('express');
const router = express.Router();
const coinPackageController = require('../controllers/CoinPackageController');
const { auth, adminAuth } = require('../middleware/auth');
const payosController = require('../controllers/payosController');

// Public routes
router.get('/', coinPackageController.getAllPackages);

// PayOS routes
router.post('/payos', payosController.createPayOSOrder);
router.post('/payos/webhook', payosController.handleWebhook);
router.get('/payos/verify/:orderCode', payosController.verifyPayment);
router.post('/payos/complete/:orderCode', payosController.completePayment);

// Protected routes (require authentication) - specific routes first
router.get('/user/balance', auth, coinPackageController.getUserBalance);
router.post('/purchase', auth, coinPackageController.purchasePackage);
router.post('/cod', auth, coinPackageController.createCODOrder);
router.get('/user/orders', auth, coinPackageController.getUserOrders);

// Admin routes (require authentication)
router.post('/', adminAuth, coinPackageController.createPackage);
router.get('/admin/orders', adminAuth, coinPackageController.getAllOrders);
router.put('/admin/orders/:orderId/confirm', adminAuth, coinPackageController.confirmCODPayment);

// Parameter routes (must come after specific routes)
router.get('/:id', coinPackageController.getPackageById);
router.put('/:id', adminAuth, coinPackageController.updatePackage);
router.delete('/:id', adminAuth, coinPackageController.deletePackage);

module.exports = router; 