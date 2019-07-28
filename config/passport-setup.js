const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');

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
            } else {
                // If not, create a new user in DB
                const newUser = await new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save();
                console.log('New user created: ' + newUser);
            }

        })
);