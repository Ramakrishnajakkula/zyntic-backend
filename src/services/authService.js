// Update authService.js to include a fallback JWT secret
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthService {
  constructor() {
    // Add a fallback JWT secret for tests
    this.jwtSecret = process.env.JWT_SECRET || 'test_jwt_secret_for_development';
  }

  // In your backend product-management-api/src/services/authService.js
// Update the signup method

async signup(userData) {
  try {
    const { email, password } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    // Create new user with username derived from email
    const username = email.split('@')[0];
    const user = new User({ 
      email, 
      password,
      username 
    });
    
    await user.save();
    
    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your_fallback_jwt_secret';
    
    const token = jwt.sign(
      { id: user._id },
      jwtSecret,
      { expiresIn: '1d' }
    );
    
    return { 
      token, 
      user: { 
        id: user._id, 
        email: user.email,
        username: user.username 
      } 
    };
  } catch (error) {
    console.error('AuthService signup error:', error);
    throw new Error(`Signup failed: ${error.message}`);
  }
}

  async login(credentials) {
    const { email, password } = credentials;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      this.jwtSecret,
      { expiresIn: '1d' }
    );
    
    return { token, user: { id: user._id, email: user.email } };
  }
}

module.exports = AuthService;