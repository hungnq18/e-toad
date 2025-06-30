const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  story: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: false
  }],
  actualCoin: {
    type: Number,
    default: 0
  },
  coin: {
    type: Number,
    default: 0
  },
  isStatus: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'product'
});

module.exports = mongoose.model('Product', productSchema); 