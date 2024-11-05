
module.exports.isLoggedIn = ((req, res, next) => {
    console.log(`User details: ${req.user}`);
    if (!req.isAuthenticated()) {
        req.flash("error","User must be Logged in.");
        return res.redirect("/login");
    }
    next();
});