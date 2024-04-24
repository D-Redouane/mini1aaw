const User = require('../models/User');
const bcrypt = require('bcrypt');

const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin/users/users-list', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ name, email, password: hashedPassword, age,role });
    await newUser.save();
    res.redirect("/users");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Server Error7"+err.message });
  }
};

exports.createjwt = async function (req, res) {
  // Define your signing key (JWT_SECRET)
  const secretKey = 'azdad'; // This should be a strong and secure key

  // Define the payload
  const payload = {
    Role: 'Admin',
    Issuer: 'Issuer',
    Username: 'JavaInUse',
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1-hour expiration
    iat: Math.floor(Date.now() / 1000), // Issued at current time
  };

  // Create the JWT with the specified algorithm
  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

  // Set the generated JWT as an environment variable
  const envFilePath = path.join(__dirname, '..', '.env');
  let envFile = fs.readFileSync(envFilePath, 'utf8');

  if (envFile.includes('JWT_SECRET')) {
    // Replace existing JWT_SECRET
    envFile = envFile.replace(/(JWT_SECRET=).*/, `$1${token}`);
  } else {
    // Add JWT_SECRET
    envFile += `\nJWT_SECRET=${token}`;
  }

  fs.writeFileSync(envFilePath, envFile);

  // Log the generated JWT
  console.log('Generated JWT:', token);

  // Optionally, you can also send the JWT as a response
  res.json({ jwt: token });
};


exports.getUserEditPageById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/user-edit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    let updateData = { name, email, age };

    // Check if password is provided and hash it if necessary
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      updateData.password = hashedPassword; // Set hashed password
    }

    await User.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}