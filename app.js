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
const { validateListing } = require("./schema.js");


app.use(express.urlencoded({extended:true}))            // to get the parameters from the query String 
app.use(methodOverride("_method"));                     //for PUT request in UPDATE Route
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));       //for CSS styling


// for index.ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





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

// Test Listings Model after creating the listing.js
// app.get("/testListings", async(req, res) => {
//     // res.send("Listing...");

//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the Beach",
//         price: 12000,
//         location: "Nagpur, MH",
//         country: "India"
//     });

//     await sampleListing.save();

//     console.log("SampleData Saved...")
//     res.send("Sample Data Saved Successfully...")
// })






// Create Route (Index Route)
app.get("/listings", wrapAsync( async (req, res, next) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    console.log("All Listings from the DB...");
    // res.send(allListings);
    res.render("listings/index.ejs", {allListings});
}) );


// CREATE ROUTE (new and create)  -> Always be above than READ route
// Open form for this route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");

    console.log("Loading Form to Create new Listing...");
});


// Add New Listing to DB    (CREATE ROUTE)
// using wrapAsync
app.post("/listings", wrapAsync( async(req, res, next) => {
    // const {title, description, price, country, etc...} = req.body;
    
    // if (!req.body.listing) {     // Handling Error using ExpressError if body doesn't contain the listing object
    //     throw new ExpressError(400, "Send a valid data for Listing.");
    // };


    // let result = validateListing.validate(req.body);       //Schema Validation using JOI
    // console.log(result);

    const { error } = validateListing.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }

    const newListing = new Listing(req.body.listing);
    await newListing.save();


    console.log("New Listing Added Successfully...");
    res.redirect("/listings");
    })
);


//READ (Show Route)
app.get("/listings/:id", wrapAsync( async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

    console.log("Listing available...");
}));


// EDIT route
app.get("/listings/:id/edit", wrapAsync( async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);

    console.log('Edit your Listing...')
    res.render("listings/edit.ejs", {listing});
}));

// UPDATE Route
app.put("/listings/:id", wrapAsync( async(req, res, next) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "Send a valid data for Listing.");
    // };    

    const { error } = validateListing.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    };

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing}); 

    console.log({ ...req.body.listing});

    res.redirect(`/listings/${id}`);
    console.log("Listing Edited Successfully...");
}));


// DELETE Route
app.delete("/listings/:id", wrapAsync( async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    console.log("Listing Deleted...");
    res.redirect('/listings');
}));


// If the request isn't match witht the above paths
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});


// Custom Error Handler
app.use((err, req, res, next) => {
    // console.log('Something went Wrong! ');
    // res.send('Something went Wrong! ');

    let { statusCode = 500, message="Something Went Wrong!!" } = err;
    // res.status(statusCode).send(message);

    console.log(`/// ERROR OCCURED ///  -> ${message}`);
    // console.log(`ERROR OCCURED: ${err.stack}`);
    res.status(statusCode).render("error.ejs", { err });
});



// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
});