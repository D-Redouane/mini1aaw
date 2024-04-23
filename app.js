// Importation des modules nécessaires
const express = require('express');
const app = express();
const ejs = require('ejs');
const productController = require('./controllers/productController'); // Importation des fonctions de contrôleur

// Configuration d'Express.js pour utiliser EJS comme moteur de template
app.set('view engine', 'ejs');

// Configuration d'Express.js pour servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static('public'));

// Routes pour les actions liées aux produits

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('home'); // Rendre la vue home.ejs pour la page d'accueil
});


// Route pour afficher la liste des produits
app.get('/products', productController.productList);

// Route pour afficher les détails d'un produit
app.get('/products/:id', productController.productDetails);

// Route pour ajouter un nouveau produit (formulaire)
app.get('/products/add', (req, res) => {
    res.render('addProduct'); // Afficher le formulaire pour ajouter un nouveau produit
});

// Route pour traiter la soumission du formulaire pour ajouter un nouveau produit
app.post('/products/add', productController.addProduct);

// Route pour supprimer un produit
app.delete('/products/:id/delete', productController.deleteProduct);

// Route pour l'interface de l'utilisateur standard
app.get('/standardUser', (req, res) => {
    // Rendre la vue correspondante pour l'utilisateur standard
    res.render('standardUser');
});

// Route pour l'interface de l'administrateur
app.get('/adminUser', (req, res) => {
    // Rendre la vue correspondante pour l'administrateur
    res.render('adminUser');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur le port ${PORT}`);
});

// Exporter l'application Express.js pour pouvoir l'utiliser dans d'autres fichiers
module.exports = app;
