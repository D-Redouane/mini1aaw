# Node.js MVC Project

This Node.js MVC (Model-View-Controller) project uses Express.js and MongoDB. It offers basic CRUD (Create, Read, Update, Delete) operations for managing users and products, with enhanced features for order management and user authentication.

## Project Structure

```
mvcproject/
│
├── controllers/
│   ├── productController.js
│   ├── userController.js
│   └── orderController.js
│
├── models/
│   ├── Product.js
│   ├── User.js
│   └── Order.js
│
├── routes/
│   └── routes.js
│
├── views/
│   ├── index.ejs
│   ├── products/
│   │   ├── edit-product.ejs
│   │   ├── new-product.ejs
│   │   ├── product-details.ejs
│   │   └── products-list.ejs
│   ├── users/
│   │   ├── user-profile.ejs
│   │   └── users-list.ejs
│   └── orders/
│       ├── new-order.ejs
│       ├── order-details.ejs
│       └── orders-list.ejs
│
├── public/
│   └── css/
│       └── styles.css
│
├── app.js
└── package.json
```

## How to Use

1. Clone this repository to your local machine with `git clone <repo-url>`.
2. Install the dependencies using `npm install`.
3. Ensure MongoDB is running on your system.
4. Create a `.env` file in the root directory with environment variables (e.g., MongoDB URI, server port).
5. Start the server with `node app.js`.
6. Access the application in your browser at `http://localhost:3000`.

## Features

- CRUD operations for users, products, and orders
- User authentication (login/signup)
- Order management

## Contributors

- [DADDIOUAMER Redouane](https://github.com/D-Redouane)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)

## Future Plans

- Add user roles and permissions
- Implement a REST API for external access (Not Complete)