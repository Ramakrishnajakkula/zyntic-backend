const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS configuration - allow all origins during development
const corsOptions = {
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Debug route to check authentication
app.get('/api/check-auth', require('./middleware/auth').authenticate, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;