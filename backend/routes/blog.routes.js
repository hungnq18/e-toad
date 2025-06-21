const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { auth } = require('../middleware/auth');

// Public routes (không cần đăng nhập)
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes (cần đăng nhập)
router.post('/', auth, blogController.createBlog);
router.post('/:id/comments', auth, blogController.addComment);
router.delete('/:id/comments/:commentId', auth, blogController.deleteComment);

// Protected routes cho tác giả
router.put('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);
router.post('/:id/like', auth, blogController.toggleLike);

module.exports = router; 