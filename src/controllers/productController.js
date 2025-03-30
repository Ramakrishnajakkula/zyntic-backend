const ProductService = require('../services/productService');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async createProduct(req, res) {
    try {
      const product = await this.productService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      
      // Validate that the ID is in the correct format
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
      
      const product = await this.productService.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await this.productService.updateProduct(productId, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const success = await this.productService.deleteProduct(productId);
      if (!success) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = ProductController;