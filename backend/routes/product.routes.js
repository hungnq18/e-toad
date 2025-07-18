const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { auth, adminAuth } = require('../middleware/auth');

// Đặt route đặc biệt lên trên
router.get('/newest', adminAuth, async (req, res) => {
    try {
        const Product = require('../models/Product');
        const products = await Product.find().sort({ createdAt: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching newest products', error: error.message });
    }
});

// Tạo sản phẩm mới (admin only)
router.post('/', adminAuth, ProductController.createProduct);
// Lấy tất cả sản phẩm (có phân trang)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const Product = require('../models/Product');
        const total = await Product.countDocuments();
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        res.json({ products, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});
// Lấy sản phẩm theo id
router.get('/:id', ProductController.getProductById);
// Cập nhật sản phẩm (admin only)
router.put('/:id', adminAuth, ProductController.updateProduct);
// Xóa sản phẩm (admin only)
router.delete('/:id', adminAuth, ProductController.deleteProduct);
// Đổi tên sản phẩm
router.post('/:id/exchange', auth, ProductController.exchangeProduct);

module.exports = router; 