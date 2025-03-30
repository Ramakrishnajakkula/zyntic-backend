const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Authentication Tests', () => {
    // Clear users collection before each test
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        // First create a user
        const signupResponse = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'logintest@example.com',
                password: 'password123'
            });
        
        // Ensure signup was successful
        expect(signupResponse.status).toBe(201);
        
        // Add a small delay to ensure user is saved to database
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Then try to login with the same credentials
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'logintest@example.com',
                password: 'password123'
            });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // ... other tests
});