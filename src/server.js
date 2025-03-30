const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Define a fallback MongoDB URI if environment variable is not set
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ramakrishna:Anji%40178909@cluster0.ifqbcou.mongodb.net/SPC?retryWrites=true&w=majority';

// Handle MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Connected to MongoDB');
  // Only start the server if running locally (not on Vercel)
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// This is required for Vercel
module.exports = app;