const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const { parse, stringify } = require('flatted');
const User = require('../models/User');


const dotenv = require('dotenv');
const path = require('path');


// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`Login failed: User with email ${email} not found`);
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login failed: Invalid credentials for user ${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    
    res.redirect("/"); // Redirect to homepage after successful login
    // res.status(200).json({ message: "Login successful" });
    
    //use next to go to the desired page
    // next();
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server Error" });
  }
};