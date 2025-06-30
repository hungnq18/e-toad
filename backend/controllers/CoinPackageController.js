const CoinPackage = require('../models/CoinPackage');
const User = require('../models/User');
const Order = require('../models/Order');

// Get all active coin packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await CoinPackage.find({ isActive: true })
            .sort({ sortOrder: 1, createdAt: -1 });

        res.json({
            success: true,
            data: packages.map(pkg => pkg.getPublicData())
        });
    } catch (error) {
        console.error('Error fetching coin packages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching coin packages',
            error: error.message
        });
    }
};

// Get package by ID
exports.getPackageById = async (req, res) => {
    try {
        const package = await CoinPackage.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Coin package not found'
            });
        }

        res.json({
            success: true,
            data: package.getPublicData()
        });
    } catch (error) {
        console.error('Error fetching coin package:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching coin package',
            error: error.message
        });
    }
};

// Create new coin package (Admin only)
exports.createPackage = async (req, res) => {
    try {
        const { name, coins, price, originalPrice, discount, popular, description, sortOrder } = req.body;

        // Validate required fields
        if (!name || !coins || !price || !originalPrice || !discount || !description) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Validate price logic
        if (price > originalPrice) {
            return res.status(400).json({
                success: false,
                message: 'Price cannot be greater than original price'
            });
        }

        const newPackage = new CoinPackage({
            name,
            coins,
            price,
            originalPrice,
            discount,
            popular: popular || false,
            description,
            sortOrder: sortOrder || 0
        });

        await newPackage.save();

        res.status(201).json({
            success: true,
            message: 'Coin package created successfully',
            data: newPackage.getPublicData()
        });
    } catch (error) {
        console.error('Error creating coin package:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating coin package',
            error: error.message
        });
    }
};

// Update coin package (Admin only)
exports.updatePackage = async (req, res) => {
    try {
        const { name, coins, price, originalPrice, discount, popular, description, isActive, sortOrder } = req.body;
        
        const package = await CoinPackage.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Coin package not found'
            });
        }

        // Update fields if provided
        if (name !== undefined) package.name = name;
        if (coins !== undefined) package.coins = coins;
        if (price !== undefined) package.price = price;
        if (originalPrice !== undefined) package.originalPrice = originalPrice;
        if (discount !== undefined) package.discount = discount;
        if (popular !== undefined) package.popular = popular;
        if (description !== undefined) package.description = description;
        if (isActive !== undefined) package.isActive = isActive;
        if (sortOrder !== undefined) package.sortOrder = sortOrder;

        // Validate price logic
        if (package.price > package.originalPrice) {
            return res.status(400).json({
                success: false,
                message: 'Price cannot be greater than original price'
            });
        }

        await package.save();

        res.json({
            success: true,
            message: 'Coin package updated successfully',
            data: package.getPublicData()
        });
    } catch (error) {
        console.error('Error updating coin package:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating coin package',
            error: error.message
        });
    }
};

// Delete coin package (Admin only)
exports.deletePackage = async (req, res) => {
    try {
        const package = await CoinPackage.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Coin package not found'
            });
        }

        // Soft delete by setting isActive to false
        package.isActive = false;
        await package.save();

        res.json({
            success: true,
            message: 'Coin package deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting coin package:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting coin package',
            error: error.message
        });
    }
};

// Purchase coin package
exports.purchasePackage = async (req, res) => {
    try {
        const { packageId } = req.body;
        const userId = req.user._id;

        // Find the package
        const package = await CoinPackage.findById(packageId);
        if (!package || !package.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Coin package not found or inactive'
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Add coins to user's account
        user.coins += package.coins;
        await user.save();

        // Here you would typically integrate with a payment gateway
        // For now, we'll just add the coins directly

        res.json({
            success: true,
            message: 'Package purchased successfully',
            data: {
                package: package.getPublicData(),
                newBalance: user.coins,
                coinsAdded: package.coins
            }
        });
    } catch (error) {
        console.error('Error purchasing package:', error);
        res.status(500).json({
            success: false,
            message: 'Error purchasing package',
            error: error.message
        });
    }
};

// Get user's coin balance
exports.getUserBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                coins: user.coins
            }
        });
    } catch (error) {
        console.error('Error fetching user balance:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user balance',
            error: error.message
        });
    }
};

// Create COD order
exports.createCODOrder = async (req, res) => {
    try {
        const { packageId } = req.body;
        const userId = req.user._id;

        // Find the package
        const package = await CoinPackage.findById(packageId);
        if (!package || !package.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Coin package not found or inactive'
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Create new order
        const newOrder = new Order({
            userId: userId,
            packageId: packageId,
            amount: package.price,
            coins: package.coins,
            paymentMethod: 'cod',
            status: 'pending',
            paymentStatus: 'unpaid'
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'COD order created successfully',
            data: {
                order: newOrder.getPublicData(),
                package: package.getPublicData()
            }
        });
    } catch (error) {
        console.error('Error creating COD order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating COD order',
            error: error.message
        });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const orders = await Order.find({ userId })
            .populate('packageId', 'name coins price')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders.map(order => ({
                ...order.getPublicData(),
                package: order.packageId
            }))
        });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user orders',
            error: error.message
        });
    }
};

// Admin: Confirm COD payment
exports.confirmCODPayment = async (req, res) => {
    try {
        const { orderId } = req.params;
        const adminId = req.user._id;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (order.paymentStatus === 'paid') {
            return res.status(400).json({
                success: false,
                message: 'Order has already been paid'
            });
        }

        // Update order status
        order.status = 'paid';
        order.paymentStatus = 'paid';
        order.paidAt = new Date();
        order.confirmedBy = adminId;
        order.confirmedAt = new Date();

        await order.save();

        // Add coins to user's account
        const user = await User.findById(order.userId);
        if (user) {
            user.coins += order.coins;
            await user.save();
        }

        res.json({
            success: true,
            message: 'COD payment confirmed successfully',
            data: {
                order: order.getPublicData(),
                newBalance: user ? user.coins : 0
            }
        });
    } catch (error) {
        console.error('Error confirming COD payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error confirming COD payment',
            error: error.message
        });
    }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'username email')
            .populate('packageId', 'name coins price')
            .populate('confirmedBy', 'username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders.map(order => ({
                ...order.getPublicData(),
                user: order.userId,
                package: order.packageId,
                confirmedBy: order.confirmedBy
            }))
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching all orders',
            error: error.message
        });
    }
}; 