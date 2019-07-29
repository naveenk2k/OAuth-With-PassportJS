const router = require('express').Router();
const passport = require('passport');

// Auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// Auth logout
router.get('/logout', (req, res) => {
    // Handle with passportJS
    res.send('Logging out');

});

// Auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Callback route for google to redirect to.
// When we go to '/google/redirect', express will first run the middleware 'passport.authenticate('google')' and then it will run the callback function
router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        // If logged in successfully, passport attaches the currently logged-in user to the request body so we have access to them as req.user
        // Now, we can redirect them to another page, perhaps a profile page and req.user gets sent along to that new route
        res.redirect('/profile');
    }
);

module.exports = router;