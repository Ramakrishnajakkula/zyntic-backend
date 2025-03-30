require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// CORRECT MongoDB Atlas connection string format
// Note: Using a single hostname with mongodb+srv protocol
const MONGODB_URI = 'mongodb+srv://ramakrishna:Anji%40178909@cluster0.ifqbcou.mongodb.net/SPC?retryWrites=true&w=majority';

console.log('Using MongoDB connection string (start):', MONGODB_URI.substring(0, 20) + '...');

const connectToDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to MongoDB successfully');
    
    // Set consistent JWT secret
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'zynetic_secure_jwt_secret_2025';
      console.log('Set JWT_SECRET in process.env');
    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectToDatabase();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

module.exports = app;