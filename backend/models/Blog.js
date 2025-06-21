const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  sections: [
    {
      heading: {
        type: String,
        trim: true
      },
      text: {
        type: String,
        required: [true, 'Section text is required'],
        trim: true
      }
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  tags: [
    {
      type: String,
      trim: true
    }
  ],
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  readTime: {
    type: Number,
    default: 0
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true
});

// Create slug from title before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Calculate read time based on all section texts
blogSchema.pre('save', function (next) {
  if (this.isModified('sections')) {
    const wordsPerMinute = 200;
    const totalText = this.sections.map(sec => sec.text).join(' ');
    const wordCount = totalText.trim().split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Text index for search on titles and section text
blogSchema.index({
  title: 'text',
  'sections.text': 'text'
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
