const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const { body, validationResult } = require("express-validator");
const isAuthenticated = require("../middleware/isAuthenticated");

routes.get('/', (req, res) => {
  res.render('index');
});

routes.get('/logout', (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.redirect('/login');
});
routes.get('/login', (req, res) => {
  res.render('auth/login');
});

routes.get('/client', (req, res) => {
  res.render('others/clientindex');
});

routes.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 4 })],
  authController.loginUser
);

routes.get("/users", isAuthenticated.isAuthenticated, userController.getAllUsers);
routes.post("/users", isAuthenticated.isAuthenticated, userController.createUser);

routes.get("/jwt", userController.createjwt);


routes.get("/admin", isAuthenticated.isAuthenticated, adminController.getAdminPage);

routes.get("/products", productController.getAllProducts);
routes.get("/products/new", isAuthenticated.isAuthenticated, (req, res) => {
  res.render("products/new-product");
});

routes.get("/products/:id", productController.getProductById);

routes.post("/products/new",productController.createProduct);

routes.get(
  "/products/:id/edit",
  productController.getProductEditPageById
);

routes.post(
  "/products/:id",
  isAuthenticated.isAuthenticated,
  productController.updateProduct
);

routes.post(
  "/products/:id/delete",
  isAuthenticated.isAuthenticated,
  productController.deleteProduct
);

module.exports = routes;
