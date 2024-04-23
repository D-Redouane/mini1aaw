const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

routes.get('/', (req, res) => {
  res.render('index');
});

routes.get('/users', userController.getAllUsers);
routes.post('/users', userController.createUser);

routes.get('/products', productController.getAllProducts);
routes.get('/products/new', (req, res) => {
  res.render('products/new-product');
});
routes.post('/products/create', productController.createProduct);

routes.get('/products/:id', productController.getProductById);
routes.get('/products/:id/edit', productController.getProductEditPageById);
routes.post('/products/:id', productController.updateProduct);
routes.post('/products/:id/delete', productController.deleteProduct);

module.exports = routes;