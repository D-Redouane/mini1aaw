// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  role: { type: String, enum: ['manager', 'client'], required: true }
});

// const bcrypt = require('bcrypt');

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next(); // Skip if password is not modified
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 10); // Hash password
//     this.password = hashedPassword; // Replace plain password with hashed one
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
