const express = require('express');
const AuthController = require('../controllers/authController');
const AuthService = require('../services/authService');
const { validateSignup, validateLogin } = require('../utils/validators');

const router = express.Router();

// Create service and controller instances
const authService = new AuthService();
const authController = new AuthController(authService);

// User signup route
router.post('/signup', validateSignup, authController.signup.bind(authController));

// User login route
router.post('/login', validateLogin, authController.login.bind(authController));

// User logout route (protected by auth middleware)
router.post('/logout', authController.logout.bind(authController));

module.exports = router;