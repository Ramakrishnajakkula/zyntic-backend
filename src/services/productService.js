const mongoose = require('mongoose');
const Product = require('../models/Product');

class ProductService {
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      console.error('ProductService createProduct error:', error);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      return await Product.find({}).sort({ createdAt: -1 });
    } catch (error) {
      console.error('ProductService getAllProducts error:', error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      // Ensure valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID format');
      }
      
      return await Product.findById(productId);
    } catch (error) {
      console.error('ProductService getProductById error:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
    } catch (error) {
      console.error('ProductService updateProduct error:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await Product.findByIdAndDelete(productId);
      return !!result; // Return true if product was found and deleted
    } catch (error) {
      console.error('ProductService deleteProduct error:', error);
      throw error;
    }
  }
}

module.exports = ProductService;