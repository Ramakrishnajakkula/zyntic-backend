const AuthService = require('../services/authService');

class AuthController {
  constructor(authService) {
    this.authService = authService || new AuthService();
  }

  async signup(req, res) {
    try {
      console.log('Signup attempt with data:', req.body);
      const result = await this.authService.signup(req.body);
      console.log('Signup successful:', result);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async login(req, res) {
    try {
      console.log('Login attempt with data:', req.body);
      const result = await this.authService.login(req.body);
      console.log('Login successful for:', result.user.email);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async logout(req, res) {
    try {
      await this.authService.logout(req.user?.id);
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = AuthController;