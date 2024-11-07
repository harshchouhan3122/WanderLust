const Listing = require("./models/listing");


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

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(req.user._id)){
        req.flash("error", "You are not the owner of this listing.");
        console.log("Unautherized Persion trying to Edit the Listing.")
        return res.redirect(`/listings/${id}`); 
    } 

    next();
};