// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['department-head', 'citizen', 'contractor','admin'],
    required: true
  },
  department: { type: String }, 
  companyName: { type: String }, // Only for contractors
  // Only for department-heads
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
