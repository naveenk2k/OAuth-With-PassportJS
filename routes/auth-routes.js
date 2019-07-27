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

// Callback route for google to redirect to
router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        res.send('You reached a callback uri');
    }
);

module.exports = router;