const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Import the routes


const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use(routes);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
