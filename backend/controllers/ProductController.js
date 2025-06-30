const Product = require('../models/Product');
const Story = require('../models/Story');
const User = require('../models/User');

const ProductController = {
  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Lấy sản phẩm theo id
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('story');
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      res.json({ success: true, data: product });
    } catch (error) {
      console.error(`Error in getProductById (id: ${req.params.id}):`, error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      res.json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Đổi xu lấy sản phẩm
  exchangeProduct: async (req, res) => {
    try {
      const userId = req.user._id ? req.user._id.toString() : req.user.id;
      const productId = req.params.id;

      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });

      if (!product.quantity || product.quantity <= 0) {
        return res.status(400).json({ message: 'Sản phẩm đã hết hàng.' });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

      if (user.coins < product.coin) {
        return res.status(400).json({ success: false, message: 'Bạn không đủ xu để đổi sản phẩm này.' });
      }

      user.coins -= product.coin;
      product.quantity -= 1;

      await user.save();
      await product.save();

      res.json({ success: true, message: 'Đổi xu thành công!', newCoin: user.coins, productQuantity: product.quantity });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Lỗi server.' });
    }
  }
};

module.exports = ProductController; 