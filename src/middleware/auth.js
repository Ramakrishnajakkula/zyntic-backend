const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Use the same JWT secret as the auth service
const jwtSecret = process.env.JWT_SECRET || 'zynetic_secure_jwt_secret_2025';
console.log('Auth middleware using secret:', jwtSecret.substring(0, 5) + '...');

const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token with the same secret as used to create it
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
      console.log("Auth middleware: Token verified successfully");
      console.log("Auth middleware: Decoded token:", decoded);
    } catch (tokenError) {
      console.error("Auth middleware error:", tokenError);
      if (tokenError.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      if (tokenError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Token validation failed' });
    }
    
    if (!decoded.userId) {
      console.error("Auth middleware: No userId in token");
      return res.status(401).json({ message: 'Invalid token format' });
    }
    
    // Find user in database
    console.log("Auth middleware: Finding user with ID:", decoded.userId);
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      console.error("Auth middleware: User not found for ID:", decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }
    
    console.log("Auth middleware: User found:", user.email, "Role:", user.role);
    
    // Add user object to request
    req.user = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: 'Authentication error' });
  }
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin middleware checking role:", req.user?.role);
  
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: 'Admin privileges required' });
};

module.exports = { authenticate, isAdmin };