const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products/products-list', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/product-details', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProductEditPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit-product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    await Product.findByIdAndUpdate(id, { name, description, price });
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
