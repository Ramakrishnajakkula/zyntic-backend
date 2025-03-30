const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const MONGODB_URI = 'mongodb+srv://ramakrishna:Anji%40178909@cluster0.ifqbcou.mongodb.net/SPC?retryWrites=true&w=majority';

async function checkProducts() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    // Create a test product
    const testProduct = new Product({
      name: 'Debug Test Product',
      description: 'Created by debug script',
      price: 19.99,
      category: 'Testing'
    });
    
    const savedProduct = await testProduct.save();
    console.log('Saved product:', savedProduct);
    
    // Get all products
    const allProducts = await Product.find();
    console.log('All products in database:', allProducts);
    
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();