exports.getAdminPage = (req, res) => {
  const user = localStorage.getItem('user'); // Get the user from local storage

  if (user && user.loggedIn) { // Check if the user is logged in
    res.render('admin/index');
  } else {
    res.redirect('/login');
  }
};