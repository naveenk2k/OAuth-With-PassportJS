const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// To specify cookie details like duration and to encrypt it
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // cookie valid for 1 day (in milliseconds)
    keys: [keys.session.cookieKey] // key used to encrypt our cookie (we don't want to send user info like ID directly to the browser as anyone could access it)
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoDB
mongoose.connect(keys.mongodb.connectionString, { useNewUrlParser: true }, () => {
    console.log('Connected to mongoDB through mongoose');
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Create home route
app.get('/', (req, res) => {
    res.render('home');
});



app.listen(3000, () => console.log('Listening for requests on port 3000'));