// main backend File (Ist main File)

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema } = require("./schema.js");
const { validateListing, validateReview } = require("./schema.js");

const Review = require("./models/review.js");


app.use(express.urlencoded({extended:true}))                    // to get the parameters from the query String 
app.use(methodOverride("_method"));                             //for PUT request in UPDATE Route
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));       //for CSS styling


// for index.ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Import Listing Routes (Restructuring Request Paths)
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


// Connect Databse
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("Connected to DB....");
})
.catch((err)=>{
    console.log(`Error Occurred: ${err}`)
})


// Root Directory
app.get("/", (req, res)=>{
    res.send("Server is working....");
});


// // Creating Middleware to validate Listing for Create and Update Route
// const checkListing = (req, res, next) => {
//     const { error } = validateListing.validate(req.body);
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//         // throw new ExpressError(400, error.details[0].message);
//     } else {
//         next();
//     }
// }



// // Create Route (Index Route    -> to show all the listings)
// app.get("/listings", wrapAsync( async (req, res, next) => {
//     const allListings = await Listing.find({});
//     // console.log(allListings);
//     console.log("All Listings from the DB...");
//     // res.send(allListings);
//     res.render("listings/index.ejs", {allListings});
// }) );


// // CREATE ROUTE (new and create)  -> Always keep it above the READ route
// // Open form for this route
// app.get("/listings/new", (req, res) => {
//     res.render("listings/new.ejs");

//     console.log("Loading Form to Create new Listing...");
// });


// // Add New Listing to DB    (CREATE ROUTE)
// // using wrapAsync
// app.post("/listings", checkListing, wrapAsync( async(req, res, next) => {

//     const newListing = new Listing(req.body.listing);
//     await newListing.save();

//     console.log("New Listing Added Successfully...");
//     res.redirect("/listings");
//     })
// );


// // Listing READ (Show Route)
// app.get("/listings/:id", wrapAsync( async (req, res, next) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs", {listing});

//     console.log("Listing available...");
// }));


// // Listing EDIT route
// app.get("/listings/:id/edit", wrapAsync( async (req, res, next) => {
//     let {id} = req.params;
//     let listing = await Listing.findById(id);
//     // console.log(listing);

//     console.log('Loading Form to Edit Listing......')
//     res.render("listings/edit.ejs", {listing});
// }));


// // Listing UPDATE Route
// app.put("/listings/:id", checkListing, wrapAsync( async(req, res, next) => {

//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing}); 

//     console.log({ ...req.body.listing});

//     res.redirect(`/listings/${id}`);
//     console.log("Listing Edited and Updated Successfully...");
// }));


// // Listing DELETE Route
// app.delete("/listings/:id", wrapAsync( async (req, res, next) => {
//     let { id } = req.params;
//     let result = await Listing.findByIdAndDelete(id);

//     console.log(`Listing Deleted... -> ${result.title},${result.location},${result.country}`);
//     res.redirect('/listings');
// }));

app.use("/listings", listings);


// // Create Middleware to validate review
// const validReview = (req,res,next) => {
//     const { error } = validateReview.validate(req.body);
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// }


// // REVIEWS Route form new Review
// app.post("/listings/:id/reviews", validReview, wrapAsync( async (req, res, next) => {
    
//     let listing = await Listing.findById(req.params.id);
//     // console.log(req.body.review);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     console.log("New review Saved...");
//     res.redirect(`/listings/${listing._id}`);
// }));

// // REVIEW DELETE Route
// app.delete("/listings/:id/reviews/:reviewId", wrapAsync( async (req, res, next) => {
    //     let { id, reviewId } = req.params;
    
    //     await Listing.findByIdAndUpdate(id, {pull: {reviews: reviewId}});   //Updating the reviews array of Listing
    //     await Review.findByIdAndDelete(reviewId);
    
    //     console.log("Review Deleted...");
//     res.redirect(`/listings/${id}`);
// }));

app.use("/listings/:id/reviews", reviews);









// If the request isn't match with the above paths
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});


// Custom Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message="Something Went Wrong!!" } = err;

    console.log(`/// ERROR OCCURED ///  -> ${message}`);
    // console.log(`ERROR OCCURED: ${err.stack}`);
    res.status(statusCode).render("error.ejs", { err });
});


// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
});