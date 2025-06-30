const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { auth } = require('../middleware/auth');

// Tạo sản phẩm mới
router.post('/', ProductController.createProduct);
// Lấy tất cả sản phẩm
router.get('/', ProductController.getAllProducts);
// Lấy sản phẩm theo id
router.get('/:id', ProductController.getProductById);
// Cập nhật sản phẩm
router.put('/:id', ProductController.updateProduct);
// Xóa sản phẩm
router.delete('/:id', ProductController.deleteProduct);
// Đổi tên sản phẩm
router.post('/:id/exchange', auth, ProductController.exchangeProduct);

module.exports = router; 