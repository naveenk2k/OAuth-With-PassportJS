const router = require('express').Router();

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
router.get('/google', (req, res) => {
    // Handle with passportJS
    res.send('Logging in with Google');
});

module.exports = router;