// routes/auth.js
import express from 'express';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { fullName, email, password, role, department,companyName } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      department: role === 'department-head' ? department : undefined,
      companyName: role === 'contractor' ? companyName : undefined,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      // Sign the JWT token with user ID and role
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
  
      // Return the token and user details
      res.json({
        token,
        user: {
          id: user._id,
          role: user.role,
          name: user.fullName,
          department: user.department,
          companyName:user.companyName
        }
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

export default router;
