const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();
const productController = new ProductController();

// Create a new product
router.post('/', productController.createProduct.bind(productController));

// Get all products
router.get('/', productController.getAllProducts.bind(productController));

// Get a single product by ID
router.get('/:id', productController.getProductById.bind(productController));

// Update a product
router.put('/:id', productController.updateProduct.bind(productController));

// Delete a product
router.delete('/:id', productController.deleteProduct.bind(productController));

module.exports = router;