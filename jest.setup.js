// Update jest.setup.js to ensure JWT_SECRET is set
const mongoose = require('mongoose');

// Hard-coded connection string (most reliable approach for testing)
const MONGODB_URI = 'mongodb+srv://ramakrishna:Anji%40178909@cluster0.ifqbcou.mongodb.net/SPC?retryWrites=true&w=majority';

// Set JWT_SECRET for tests if not already set
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret';

jest.setTimeout(30000);

// Connect to test database before all tests
beforeAll(async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB for testing');
    console.log('JWT_SECRET for testing is set:', !!process.env.JWT_SECRET);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
});