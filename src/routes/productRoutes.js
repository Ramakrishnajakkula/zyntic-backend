const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middleware/auth');

const productController = new ProductController();

// Public routes - anyone can view products
router.get('/', authenticate, productController.getAllProducts.bind(productController));
router.get('/:id', authenticate, productController.getProductById.bind(productController));

// Admin-only routes - only admins can create, update, delete
router.post('/', authenticate, isAdmin, productController.createProduct.bind(productController));
router.put('/:id', authenticate, isAdmin, productController.updateProduct.bind(productController));
router.delete('/:id', authenticate, isAdmin, productController.deleteProduct.bind(productController));

// User routes - any authenticated user can rate
router.post('/:id/rate', authenticate, productController.rateProduct.bind(productController));

module.exports = router;