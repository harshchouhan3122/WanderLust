
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(`User (currently logged in) details: ${req.user}`);
    if (!req.isAuthenticated()) {       //means no user is logged in
        req.session.redirectUrl = req.originalUrl;
        // console.log("Current URL -> " + req.session.redirectUrl);
        req.flash("error","User must be Logged in.");
        return res.redirect("/login");

    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    // console.log("saveRedirect middleware called...");
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        // console.log("locally URL saved...");
    }
    next();
};

