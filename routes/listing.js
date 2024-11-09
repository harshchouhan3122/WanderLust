const express = require("express");
const router = express.Router({ mergeParams: true });

// const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

// const Listing = require("../models/listing.js");
// const { validateListing } = require("../schema.js");
const { isLoggedIn, isOwner, checkListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");


// app.use(express.urlencoded({extended:true}))                    // to get the parameters from the query String 
// app.use(methodOverride("_method"));                             //for PUT request in UPDATE Route
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));       //for CSS styling


// Router.route -> to combine the same named paths
router.get("/new", isLoggedIn, listingController.renderNewForm );   //keep this route at the top , otherwise new is determined as id

router.route("/")
    .get( wrapAsync ( listingController.index ) )                                               // Index Route
    .post( isLoggedIn, checkListing, wrapAsync(listingController.addListing ) );                // Create Route

router.route("/:id")
    .get( wrapAsync( listingController.showListing) )                                           // Show Route
    .put( isLoggedIn, isOwner, checkListing, wrapAsync( listingController.updateListing))       // Update Route
    .delete( isLoggedIn, isOwner, wrapAsync( listingController.deleteListing));                 // Destroy Route

router.get("/:id/edit", isLoggedIn, isOwner ,wrapAsync( listingController.renderEditForm));     // Edit Route



module.exports = router;