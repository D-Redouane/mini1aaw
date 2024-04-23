const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/users-list', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
