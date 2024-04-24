// Admin page route
const dotenv = require('dotenv');
const path = require('path');
const jwt = require("jsonwebtoken");


// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

exports.getAdminPage = (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    res.redirect('/login');
    // return res.status(401).json({ error: "Unauthorized1" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.userId = decoded.id;

    // Continue to the next middleware or route handler
    res.render('admin/index'); 
    next();
  } catch (err) {
    res.redirect('/login');
    // return res.status(401).json({ error: "Unauthorized2"+err.message });
  }
};