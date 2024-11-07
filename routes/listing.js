const express = require("express");
const router = express.Router({ mergeParams: true });

const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { validateListing } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");


// app.use(express.urlencoded({extended:true}))                    // to get the parameters from the query String 
// app.use(methodOverride("_method"));                             //for PUT request in UPDATE Route
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));       //for CSS styling


// // for index.ejs 
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));



// Creating Middleware to validate Listing for Create and Update Route
const checkListing = (req, res, next) => {
    const { error } = validateListing.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
        // throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
}


// Create Route (Index Route    -> to show all the listings)
router.get("/", wrapAsync( async (req, res, next) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    console.log("All Listings from the DB...");
    // res.send(allListings);
    res.render("listings/index.ejs", {allListings});
}) );


// CREATE ROUTE (new and create)  -> Always keep it above the READ route
// Open form for this route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
    console.log("Loading Form to Create new Listing...");
});


// Add New Listing to DB    (CREATE ROUTE)
// using wrapAsync
router.post("/", isLoggedIn, checkListing, wrapAsync( async(req, res, next) => {

    const newListing = new Listing(req.body.listing);
    // console.log(req.user);
    newListing.owner = req.user._id;    //current user is the owner of this new listing
    await newListing.save();

    console.log("New Listing Added Successfully...");
    req.flash("success", "New listing Added Successfully !");
    res.redirect("/listings");

    })
);


// Listing READ (Show Route)
router.get("/:id", wrapAsync( async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews").populate("owner");
    // console.log(req.user);
    // console.log(listing.owner._id);
    if (listing){
        res.render("listings/show.ejs", {listing});

    } else{
        console.log("Listing not found...");
        req.flash("error", "Requested Listing not found !");
        res.redirect("/listings"); 
    }

    console.log("Listing available...");
}));


// Listing EDIT route
router.get("/:id/edit", isLoggedIn, wrapAsync( async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);

    if (listing){
        console.log('Loading Form to Edit Listing......')
        res.render("listings/edit.ejs", {listing});

    } else{
        console.log("Listing not found...");
        req.flash("error", "Requested Listing not found !");
        res.redirect("/listings"); 
    }
}));


// Listing UPDATE Route
router.put("/:id", isLoggedIn, checkListing, wrapAsync( async(req, res, next) => {

    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (listing.owner._id.equals(req.user._id)){

        await Listing.findByIdAndUpdate(id, { ...req.body.listing}); 
    
        // console.log({ ...req.body.listing});
    
        req.flash("success", "Listing Updated !");
        res.redirect(`/listings/${id}`);
        console.log("Listing Edited and Updated Successfully...");
        
    } else {
        req.flash("error", "You don't have permission to edit this listing.");
        res.redirect(`/listings/${id}`);
        console.log("Unautherized Persion trying to Edit the Listing.")
    }

}));


// Listing DELETE Route
router.delete("/:id", isLoggedIn, wrapAsync( async (req, res, next) => {
    let { id } = req.params;
    let result = await Listing.findByIdAndDelete(id);
    
    console.log(`Listing Deleted... -> ${result.title},${result.location},${result.country}`);
    req.flash("success", "Listing Deleted !")
    res.redirect('/listings');
}));



module.exports = router;