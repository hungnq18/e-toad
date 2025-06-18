const Blog = require('../models/Blog');
const { isValidObjectId } = require('mongoose');

// Get all published blogs with pagination
exports.getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find({ status: 'published' })
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments({ status: 'published' });

        res.json({
            success: true,
            data: blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blogs',
            error: error.message
        });
    }
};

// Get blog by slug
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'username email')
            .populate('comments.user', 'username');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog',
            error: error.message
        });
    }
};

// Get blogs by tag
exports.getBlogsByTag = async (req, res) => {
    try {
        const blogs = await Blog.find({
            tags: req.params.tag,
            status: 'published'
        })
        .populate('author', 'username email')
        .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blogs by tag',
            error: error.message
        });
    }
};

// Create new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, tags, featuredImage } = req.body;

        const blog = new Blog({
            title,
            content,
            tags,
            featuredImage,
            author: req.user._id
        });

        await blog.save();

        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating blog',
            error: error.message
        });
    }
};

// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const { title, content, tags, featuredImage, status } = req.body;
        const blogId = req.params.id;

        if (!isValidObjectId(blogId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid blog ID'
            });
        }

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this blog'
            });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                title,
                content,
                tags,
                featuredImage,
                status
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedBlog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating blog',
            error: error.message
        });
    }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!isValidObjectId(blogId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid blog ID'
            });
        }

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this blog'
            });
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting blog',
            error: error.message
        });
    }
};

// Like/Unlike blog
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        const likeIndex = blog.likes.indexOf(req.user._id);

        if (likeIndex === -1) {
            // Like the blog
            blog.likes.push(req.user._id);
        } else {
            // Unlike the blog
            blog.likes.splice(likeIndex, 1);
        }

        await blog.save();

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating like status',
            error: error.message
        });
    }
};

// Add comment
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        blog.comments.push({
            user: req.user._id,
            content
        });

        await blog.save();

        // Populate the new comment's user information
        await blog.populate('comments.user', 'username');

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding comment',
            error: error.message
        });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        // Check if user is the comment author
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this comment'
            });
        }

        comment.deleteOne();
        await blog.save();

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting comment',
            error: error.message
        });
    }
};

// Get authenticated user's blogs
exports.getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user blogs',
            error: error.message
        });
    }
};

// Get blogs by author
exports.getBlogsByAuthor = async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.params.authorId,
            status: 'published'
        })
        .populate('author', 'username email')
        .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching author blogs',
            error: error.message
        });
    }
}; 