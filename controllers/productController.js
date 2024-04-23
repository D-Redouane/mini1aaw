
const Product = require('../models/Product');

let products = [
    new Product('Ordinateur portable', 1200, 'Un ordinateur portable puissant avec un processeur rapide.', 'Électronique', 10, 'laptop.jpg'),
    new Product('T-shirt noir', 25, 'Un t-shirt noir de haute qualité.', 'Vêtements', 50, 'tshirt.jpg')
];

const productList = (req, res) => {
    res.render('productList', { products: products });
};

const productDetails = (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product.id === productId);
    if (!product) {
        return res.status(404).send('Produit non trouvé');
    }
    res.render('productDetails', { product: product });
};

const addProduct = (req, res) => {
    const { name, price, description, category, quantity, imageURL } = req.body;
    const newProduct = new Product(name, price, description, category, quantity, imageURL);
    products.push(newProduct);
    res.redirect('/products');
};

const deleteProduct = (req, res) => {
    const productId = req.params.id;
    products = products.filter(product => product.id !== productId);
    res.redirect('/products');
};

module.exports = {
    productList,
    productDetails,
    addProduct,
    deleteProduct
};
