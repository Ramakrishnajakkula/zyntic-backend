const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthService {
  constructor() {
    // Fix: Remove duplicate constructor
    this.jwtSecret = process.env.JWT_SECRET || 'zynetic_secure_jwt_secret_2025';
    console.log('AuthService using secret:', this.jwtSecret.substring(0, 5) + '...');
  }

  async signup(userData) {
    try {
      console.log('AuthService receiving signup data:', userData);
      const { email, password, role } = userData;
      
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
        username,
        role: role || 'user'
      });
      
      console.log('User object before save:', {
        email: user.email,
        username: user.username,
        role: user.role
      });
      
      await user.save();
      
      // Generate JWT token with userId CORRECTLY
      const token = jwt.sign(
        { 
          userId: user._id.toString(),
          email: user.email,
          role: user.role 
        },
        this.jwtSecret,
        { expiresIn: '1d' }
      );
      
      console.log('Generated token payload:', { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      });
      
      return { 
        token, 
        user: { 
          id: user._id.toString(), 
          email: user.email,
          username: user.username,
          role: user.role 
        } 
      };
    } catch (error) {
      console.error('AuthService signup error:', error);
      throw error;
    }
  }

  async login(credentials) {
    try {
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
      
      // Generate JWT token with userId CORRECTLY
      const token = jwt.sign(
        { 
          userId: user._id.toString(),
          email: user.email,
          role: user.role 
        },
        this.jwtSecret,
        { expiresIn: '1d' }
      );
      
      console.log('Login: Generated token payload:', { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      });
      
      return { 
        token, 
        user: { 
          id: user._id.toString(), 
          email: user.email,
          username: user.username,
          role: user.role 
        } 
      };
    } catch (error) {
      console.error('AuthService login error:', error);
      throw error;
    }
  }

  async logout(userId) {
    // Implement if you need server-side logout functionality
    return { success: true };
  }
}

module.exports = AuthService;