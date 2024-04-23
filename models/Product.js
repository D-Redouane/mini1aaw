

class Product {
    constructor(name, price, description, category, quantity, imageURL) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.imageURL = imageURL;
    }

    displayDetails() {
        return `Nom: ${this.name}\nPrix: ${this.price} €\nDescription: ${this.description}\nCatégorie: ${this.category}\nQuantité: ${this.quantity}\nImage: ${this.imageURL}`;
    }
}

module.exports = Product;
