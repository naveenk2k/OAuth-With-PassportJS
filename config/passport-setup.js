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
        (accessToken, refreshToken, profile, done) => {
            // Passport callback function
            new User({
                    username: profile.displayName,
                    googleID: profile.id
                })
                .save()
                .then((newUser) => {
                    console.log(`New user created: ` + newUser);
                });
        })
);