const Blog = require('../models/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
    try {
        const { title, content, tags, image } = req.body;
        const blog = new Blog({
            title,
            content,
            tags,
            image,
            author: req.user._id
        });

        await blog.save();
        await blog.populate('author', 'username fullName avatar');

        res.status(201).json({
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog',
            error: error.message
        });
    }
};

// Get all blogs with pagination and filters
exports.getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const tag = req.query.tag;
        const author = req.query.author;

        const query = { status: 'published' };

        if (search) {
            query.$text = { $search: search };
        }

        if (tag) {
            query.tags = tag;
        }

        if (author) {
            query.author = author;
        }

        const blogs = await Blog.find(query)
            .populate('author', 'username fullName avatar')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        res.json({
            blogs,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBlogs: total
        });
    } catch (error) {
        console.log('=== ERROR IN BLOG CONTROLLER ===');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        console.log('=== END ERROR ===');
        
        res.status(500).json({
            message: 'Error fetching blogs',
            error: error.message
        });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username fullName avatar')
            .populate('comments.user', 'username fullName avatar');

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching blog',
            error: error.message
        });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const { title, content, tags, image, status } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Not authorized to update this blog'
            });
        }

        const updates = {
            title: title || blog.title,
            content: content || blog.content,
            tags: tags || blog.tags,
            image: image || blog.image,
            status: status || blog.status
        };

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        ).populate('author', 'username fullName avatar');

        res.json({
            message: 'Blog updated successfully',
            blog: updatedBlog
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating blog',
            error: error.message
        });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Not authorized to delete this blog'
            });
        }

        await blog.deleteOne();

        res.json({
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting blog',
            error: error.message
        });
    }
};

// Like/Unlike a blog
exports.toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
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
            message: likeIndex === -1 ? 'Blog liked' : 'Blog unliked',
            likes: blog.likes.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error toggling like',
            error: error.message
        });
    }
};

// Add a comment to a blog
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        blog.comments.push({
            user: req.user._id,
            content
        });

        await blog.save();
        await blog.populate('comments.user', 'username fullName avatar');

        res.json({
            message: 'Comment added successfully',
            comments: blog.comments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding comment',
            error: error.message
        });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        const comment = blog.comments.id(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        // Check if user is the comment author
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Not authorized to delete this comment'
            });
        }

        comment.deleteOne();
        await blog.save();

        res.json({
            message: 'Comment deleted successfully',
            comments: blog.comments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting comment',
            error: error.message
        });
    }
}; 