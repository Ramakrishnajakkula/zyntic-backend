const ProductService = require('../services/productService');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async createProduct(req, res) {
    try {
      console.log('Creating product with data:', req.body);
      const product = await this.productService.createProduct(req.body);
      console.log('Product created successfully:', product._id);
      return res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      console.log('Fetching all products');
      const products = await this.productService.getAllProducts();
      console.log(`Found ${products.length} products`);
      return res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      console.log(`Fetching product with ID: ${productId}`);
      
      // Validate that the ID is in the correct format
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        console.warn('Invalid product ID format:', productId);
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
      
      const product = await this.productService.getProductById(productId);
      
      if (!product) {
        console.warn(`Product not found with ID: ${productId}`);
        return res.status(404).json({ message: 'Product not found' });
      }
      
      console.log('Product found:', product._id);
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      console.log(`Updating product with ID: ${productId}`, req.body);
      
      const product = await this.productService.updateProduct(productId, req.body);
      
      if (!product) {
        console.warn(`Product not found for update with ID: ${productId}`);
        return res.status(404).json({ message: 'Product not found' });
      }
      
      console.log('Product updated successfully:', product._id);
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async rateProduct(req, res) {
    try {
      const productId = req.params.id;
      const userId = req.user.id;
      const { rating, comment } = req.body;
      
      console.log(`User ${userId} rating product ${productId} with value ${rating}`);
      
      if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5' });
      }
      
      const product = await this.productService.addRating(productId, userId, rating, comment);
      
      if (!product) {
        console.warn(`Product not found for rating with ID: ${productId}`);
        return res.status(404).json({ message: 'Product not found' });
      }
      
      console.log('Product rated successfully:', product._id);
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error rating product:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      console.log(`Deleting product with ID: ${productId}`);
      
      const success = await this.productService.deleteProduct(productId);
      
      if (!success) {
        console.warn(`Product not found for deletion with ID: ${productId}`);
        return res.status(404).json({ message: 'Product not found' });
      }
      
      console.log('Product deleted successfully:', productId);
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = ProductController;