const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        // User is not logged in, so we can redirect them to another page that's not the profile page (so that they don't see a random error)
        res.redirect('/auth/login');
    } else {
        // User is logged in, so we can continue them to the next piece of middleware, which is the anonymous function below
        next();
    }
};

// When the user tries to visit the profile page (localhost:3000/profile), we check if they are logged in using the middleware function 'authCheck' [which gets the same (req, res) as the callback function below] and this decides what happens next (whether redirect or show profile page)
router.get('/', authCheck, (req, res) => {
    // Render profile page
    res.send(`You are logged in. This is your profile. You are: ${req.user.username}`);
});

module.exports = router;