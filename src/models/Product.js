const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  ratings: [ratingSchema],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;