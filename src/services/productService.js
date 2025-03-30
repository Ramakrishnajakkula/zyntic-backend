const Product = require('../models/Product');
const mongoose = require('mongoose');

class ProductService {
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      console.error('ProductService createProduct error:', error);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      // First check if we can connect to the database
      if (mongoose.connection.readyState !== 1) {
        console.error('Database connection is not established');
        throw new Error('Database connection error');
      }
      
      console.log('ProductService: Getting all products');
      return await Product.find({}).sort({ createdAt: -1 });
    } catch (error) {
      console.error('ProductService getAllProducts error:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error('ProductService getProductById error:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      return await Product.findByIdAndUpdate(
        id,
        productData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      console.error('ProductService updateProduct error:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const result = await Product.findByIdAndDelete(id);
      return !!result; // Convert to boolean
    } catch (error) {
      console.error('ProductService deleteProduct error:', error);
      throw error;
    }
  }

  async addRating(productId, userId, ratingValue, comment) {
    try {
      const product = await Product.findById(productId);
      
      if (!product) {
        return null;
      }
      
      // Check if user has already rated this product
      const existingRatingIndex = product.ratings?.findIndex(
        r => r.userId.toString() === userId.toString()
      );
      
      // Initialize ratings array if it doesn't exist
      if (!product.ratings) {
        product.ratings = [];
      }
      
      if (existingRatingIndex >= 0) {
        // Update existing rating
        product.ratings[existingRatingIndex].value = ratingValue;
        product.ratings[existingRatingIndex].comment = comment || product.ratings[existingRatingIndex].comment;
        product.ratings[existingRatingIndex].date = Date.now();
      } else {
        // Add new rating
        product.ratings.push({
          userId,
          value: ratingValue,
          comment,
          date: Date.now()
        });
      }
      
      // Calculate average rating
      if (product.ratings.length > 0) {
        const sum = product.ratings.reduce((total, rating) => total + rating.value, 0);
        product.averageRating = Number((sum / product.ratings.length).toFixed(1));
      } else {
        product.averageRating = 0;
      }
      
      await product.save();
      
      return product;
    } catch (error) {
      console.error('ProductService addRating error:', error);
      throw error;
    }
  }
}

module.exports = ProductService;