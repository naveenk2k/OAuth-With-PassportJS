const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Connect to mongoDB
mongoose.connect(keys.mongodb.connectionString, { useNewUrlParser: true }, () => {
    console.log('Connected to mongoDB through mongoose');
});

// Set up routes
app.use('/auth', authRoutes);

// Create home route
app.get('/', (req, res) => {
    res.render('home');
});



app.listen(3000, () => console.log('Listening for requests on port 3000'));