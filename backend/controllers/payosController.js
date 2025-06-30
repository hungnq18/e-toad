require('dotenv').config();
const express = require("express");
const cors = require("cors");
const PayOS = require("@payos/node");
const mongoose = require('mongoose');
const CoinPackage = require('../models/CoinPackage');
const Order = require('../models/Order');
const User = require('../models/User');

const app = express();

const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const payosController = {
    // Create PayOS payment link
    createPayOSOrder: async (req, res) => {
        try {
            const { packageId, userId } = req.body;

            // Validate input
            if (!packageId || !userId) {
                return res.status(400).json({
                    success: false,
                    message: 'Package ID and User ID are required'
                });
            }

            // Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(packageId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Package ID format'
                });
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid User ID format'
                });
            }

            // Get package details
            const package = await CoinPackage.findById(packageId);
            if (!package) {
                return res.status(404).json({
                    success: false,
                    message: 'Package not found'
                });
            }

            // Get user details
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Create order code (last 6 digits of timestamp)
            const orderCode = Number(String(Date.now()).slice(-6));
            // Create random 6-digit order number (not equal to orderCode)
            let orderNumber;
            do {
                orderNumber = Math.floor(100000 + Math.random() * 900000); // random 6-digit number
            } while (orderNumber === orderCode);

            // Prepare payment data
            const paymentData = {
                orderCode: orderCode,
                orderNumber: orderNumber,
                amount: package.price,
                description: `${package.name} - ${package.coins} coins`,
                items: [
                    {
                        name: package.name,
                        quantity: 1,
                        price: package.price,
                    },
                ],
                returnUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}payment/success?orderCode=${orderCode}`,
                cancelUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}payment/failed?orderCode=${orderCode}`,
            };

            // Create payment link
            const paymentLinkResponse = await payOS.createPaymentLink(paymentData);

            // Create order record in database
            const order = new Order({
                orderCode: orderCode,
                orderNumber: orderNumber,
                userId: userId,
                packageId: packageId,
                amount: package.price,
                coins: package.coins,
                paymentMethod: 'payos',
                status: 'pending',
                paymentUrl: paymentLinkResponse.checkoutUrl,
                transactionId: paymentLinkResponse.transactionId || null
            });

            await order.save();

            res.json({
                success: true,
                data: {
                    checkoutUrl: paymentLinkResponse.checkoutUrl,
                    orderCode: orderCode,
                    transactionId: paymentLinkResponse.transactionId,
                    amount: package.price
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create payment link',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    },

    // Handle PayOS webhook
    handleWebhook: async (req, res) => {
        try {
            const { data, signature } = req.body;
            console.log('Webhook received:', data);

            // Verify webhook signature
            const isValidSignature = payOS.verifyPaymentWebhook(data, signature);
            if (!isValidSignature) {
                return res.status(400).json({ success: false, message: 'Invalid signature' });
            }

            const { _id: orderId, orderCode, transactionId, amount, status } = data;
            console.log('Webhook status:', status, 'orderId:', orderId, 'orderCode:', orderCode);

            // Find and update order by _id if available, else by orderCode
            let order = null;
            if (orderId) {
                order = await Order.findById(orderId);
                console.log('Tìm order theo _id:', orderId, 'Kết quả:', !!order);
            }
            if (!order && orderCode) {
                order = await Order.findOne({ orderCode: Number(orderCode) });
                console.log('Tìm order theo orderCode:', orderCode, 'Kết quả:', !!order);
            }
            if (!order) {
                console.log('Order not found for _id:', orderId, 'or orderCode:', orderCode);
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            // Update order status and paymentStatus
            if (status === 'PAID') {
                console.log('Bắt đầu cộng xu cho user. order:', order._id, 'userId:', order.userId, 'packageId:', order.packageId);
                const coinPackage = await CoinPackage.findById(order.packageId);
                if (!coinPackage) {
                    console.log('Không tìm thấy package:', order.packageId);
                }
                if (coinPackage) {
                    try {
                        // Gọi hàm addCoins cho user
                        const UserModel = require('../models/User');
                        await UserModel.addCoins(order.userId, coinPackage.coins);
                        console.log('Cộng xu thành công cho user:', order.userId, 'Số xu cộng:', coinPackage.coins);
                    } catch (err) {
                        console.log('Lỗi khi cộng xu cho user:', err);
                    }
                }
                // Đảm bảo cập nhật trạng thái order thành công
                order.status = 'completed';
                order.paymentStatus = 'paid';
                order.paidAt = new Date();
                await order.save();
                console.log('Order đã được cập nhật trạng thái completed và paid:', order._id);
            } else if (status === 'CANCELLED') {
                order.status = 'cancelled';
                order.paymentStatus = 'unpaid';
                await order.save();
            } else {
                order.status = 'failed';
                order.paymentStatus = 'unpaid';
                await order.save();
            }
            order.transactionId = transactionId;

            res.json({ success: true, message: 'Webhook processed successfully' });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Webhook processing failed',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    },

    // Verify payment status
    verifyPayment: async (req, res) => {
        try {
            const { orderCode } = req.params;

            const order = await Order.findOne({ orderCode: orderCode });
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.json({
                success: true,
                data: {
                    orderCode: order.orderCode,
                    status: order.status,
                    amount: order.amount,
                    paidAt: order.paidAt
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to verify payment',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    },

    // Complete payment and add coins when frontend confirms success
    completePayment: async (req, res) => {
        try {
            const { orderCode } = req.params;

            // Find order by orderCode
            const order = await Order.findOne({ orderCode: Number(orderCode) });
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            // Check if order is already completed
            if (order.status === 'completed' && order.paymentStatus === 'paid') {
                return res.json({
                    success: true,
                    message: 'Order already completed',
                    data: {
                        orderCode: order.orderCode,
                        status: order.status,
                        amount: order.amount,
                        coins: order.coins
                    }
                });
            }

            // Add coins to user
            const coinPackage = await CoinPackage.findById(order.packageId);
            if (!coinPackage) {
                return res.status(404).json({
                    success: false,
                    message: 'Package not found'
                });
            }

            try {
                // Gọi hàm addCoins cho user
                const UserModel = require('../models/User');
                await UserModel.addCoins(order.userId, coinPackage.coins);
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error adding coins to user'
                });
            }

            // Update order status
            order.status = 'completed';
            order.paymentStatus = 'paid';
            order.paidAt = new Date();
            await order.save();

            res.json({
                success: true,
                message: 'Payment completed successfully',
                data: {
                    orderCode: order.orderCode,
                    status: order.status,
                    amount: order.amount,
                    coins: order.coins
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to complete payment',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }
};

module.exports = payosController; 