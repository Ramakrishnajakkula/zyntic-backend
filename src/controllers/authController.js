class AuthController {
    constructor(authService) {
      this.authService = authService;
    }
  
    // Update authController.js signup method:
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
        const { email, password } = req.body;
        const result = await this.authService.login({ email, password });
        return res.status(200).json(result);
      } catch (error) {
        if (error.message === 'Invalid credentials') {
          return res.status(401).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  
    async logout(req, res) {
      try {
        await this.authService.logout(req.user);
        return res.status(200).json({ message: 'Logged out successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  }
  
  module.exports = AuthController;