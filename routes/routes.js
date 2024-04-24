const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');

const isAuthenticated = (req, res, next) => {
  const userId = req.cookies;
  console.log(req) // Get the user ID from cookies
  if (userId) {
    req.user = { id: userId }; // Store the user ID in the request object
    return next(); // Proceed to the next middleware
  }
  // res.redirect('/login'); // If not authenticated, redirect to login
};


routes.get('/', (req, res) => {
  res.render('index');
});

routes.get('/login', (req, res) => {
  res.render('auth/login');
});

routes.post('/login', userController.loginUser);

routes.get('/users', isAuthenticated ,userController.getAllUsers);
routes.post('/users',isAuthenticated, userController.createUser);

routes.get('/admin', isAuthenticated, adminController.getAdminPage);





routes.get('/products', productController.getAllProducts);
routes.get('/products/new',isAuthenticated, (req, res) => {
  res.render('products/new-product');
});
routes.post('/products/create', isAuthenticated , productController.createProduct);

routes.get('/products/:id', productController.getProductById);
routes.get('/products/:id/edit', isAuthenticated , productController.getProductEditPageById);
routes.post('/products/:id', isAuthenticated ,productController.updateProduct);
routes.post('/products/:id/delete', isAuthenticated ,productController.deleteProduct);

module.exports = routes;