const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');

// serializeUser is the method that is called on the login request(during the authentication - only once) and if login is successful then it decides what user information should get stored in the session and a cookie is sent to the browser for the same to maintain the session.
passport.serializeUser((user, done) => {
    // Here, we are using the user's id (as stored in the mongoDB database) to 'stuff' the cookie, i.e use it as the identifying piece of information to determine if a user is currently logged in to our site or not
    done(null, user.id);
});

// deserializeUser is the method that is called on *all subsequent requests* and is called by the passport.session middleware. It enables us to load additional user information on every request.
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy({
            // Options for google strategy
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        // Passport callback function
        async (accessToken, refreshToken, profile, done) => {
            // Check if user already exists in our DB
            const existingUser = await User.findOne({ googleID: profile.id });
            if (existingUser) {
                // Already have the user in DB
                console.log('User already exists: ' + existingUser);
                done(null, existingUser);
            } else {
                // If not, create a new user in DB
                const newUser = await new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save();
                console.log('New user created: ' + newUser);
                done(null, newUser);
            }

        })
);