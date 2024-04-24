// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  const userId = req.cookies.user; // Get the user ID from cookies
  if (userId) {
    req.user = { id: userId }; // Store the user ID in the request object
    return next(); // Proceed to the next middleware
  }
  res.redirect('/login'); // If not authenticated, redirect to login
};

// Admin page route
exports.getAdminPage = (req, res) => {
  if (req.user) { // Check if the user information is present
    res.render('admin/index'); // Render the admin page
  } else {
    res.render('admin/index'); // Redirect to login if no user is found
  }
};
